from rest_framework import serializers
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import User
from .models import SignUp, LoginUser, AddProduct
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

class AuthSerializer(serializers.Serializer):
    mobile_number = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        mobile_number = data.get('mobile_number')
        password = data.get('password')

        if mobile_number and password:
            user = authenticate(request=self.context.get('request'), username=mobile_number, password=password)
            if user is None:
                raise serializers.ValidationError(_('Unable to login, please check credentials'), code='authorization')
        else:
            raise serializers.ValidationError(_('Must include "mobile_number" and "password".'), code='authorization')

        data['user'] = user
        return data

class DisplayProdSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddProduct
        fields = ['id', 'name', 'price', 'ingredients', 'nutritional_facts', 'image', 'barcode']

class SignUpSerializer(serializers.ModelSerializer):
    liked_products = DisplayProdSerializer(many=True, read_only=True)

    class Meta:
        model = SignUp
        fields = ['id', 'firstName', 'lastName', 'mobile_number', 'healthComplication', 'illness', 'illness2', 'illness3', 'liked_products']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_mobile_number(self, value):
        if not str(value).isdigit():
            raise serializers.ValidationError("Mobile number must contain only digits.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        liked_products = validated_data.pop('liked_products', [])
        validated_data['password'] = make_password(password)

        login_user = LoginUser.objects.create_user(
            mobile_number=validated_data['mobile_number'],
            password=password
        )

        signup = SignUp.objects.create(user=login_user, **validated_data)
        signup.user.liked_products.set(liked_products)
        return signup
class UpdateUserSerializer(serializers.ModelSerializer):
    liked_products = serializers.PrimaryKeyRelatedField(many=True, queryset=AddProduct.objects.all(), required=False)

    class Meta:
        model = SignUp
        fields = ['firstName', 'lastName', 'mobile_number', 'healthComplication', 'illness', 'illness2', 'illness3', 'liked_products']

    def validate_mobile_number(self, value):
        if not str(value).isdigit():
            raise serializers.ValidationError("Mobile number must contain only digits.")
        return value

    def update(self, instance, validated_data):
        instance.firstName = validated_data.get('firstName', instance.firstName)
        instance.lastName = validated_data.get('lastName', instance.lastName)
        instance.mobile_number = validated_data.get('mobile_number', instance.mobile_number)
        instance.healthComplication = validated_data.get('healthComplication', instance.healthComplication)
        instance.illness = validated_data.get('illness', instance.illness)
        instance.illness2 = validated_data.get('illness2', instance.illness2)
        instance.illness3 = validated_data.get('illness3', instance.illness3)
        liked_products = validated_data.get('liked_products', None)
        if liked_products is not None:
            instance.user.liked_products.set(liked_products)
        instance.save()
        return instance

class ChangePasswordSerializer(serializers.Serializer):
    currentPassword = serializers.CharField(write_only=True)
    newPassword = serializers.CharField(write_only=True)
    confirmNewPassword = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['newPassword'] != data['confirmNewPassword']:
            raise serializers.ValidationError("New passwords do not match")
        return data

class ToggleLikeProductSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()

    def validate_product_id(self, value):
        if not AddProduct.objects.filter(id=value).exists():
            raise serializers.ValidationError("Product does not exist.")
        return value

    def save(self, **kwargs):
        product_id = self.validated_data['product_id']
        user = self.context['request'].user
        signup_user = SignUp.objects.get(user=user)
        product = AddProduct.objects.get(id=product_id)

        if product in signup_user.user.liked_products.all():
            signup_user.user.liked_products.remove(product)
            return {'message': 'Product unliked successfully.'}
        else:
            signup_user.user.liked_products.add(product)
            return {'message': 'Product liked successfully.'}

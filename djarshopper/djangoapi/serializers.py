from rest_framework import serializers
from .models import SignUp, LoginUser, AddProduct
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUp
        fields = ['id', 'firstName', 'lastName', 'password', 'mobile_number', 'healthComplication', 'illness', 'illness2', 'illness3']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        
        login_user = LoginUser.objects.create_user(
            mobile_number=validated_data['mobile_number'],
            password=password
        )
        
        signup = SignUp.objects.create(user=login_user, **validated_data)
        return signup

#for login serializer
class AuthSerializer(serializers.Serializer):
    mobile_number = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        mobile_number = data.get('mobile_number')
        password = data.get('password')

        if mobile_number and password:
            user = authenticate(request=self.context.get('request'), mobile_number=mobile_number, password=password)

            if user is None:
                raise serializers.ValidationError(_('Unable to login, please check credentials'), code='authorization')
        else:
            raise serializers.ValidationError(_('Must include "mobile_number" and "password".'), code='authorization')

        data['user'] = user
        return data

# serializer for displaying products
class DisplayProdSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddProduct
        fields = ['id', 'name', 'price', 'ingredients', 'nutritional_facts', 'image', 'barcode']

# serializer for updating user details
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUp
        fields = ['firstName', 'lastName', 'mobile_number', 'healthComplication', 'illness', 'illness2', 'illness3']

    def update(self, instance, validated_data):
        instance.firstName = validated_data.get('firstName', instance.firstName)
        instance.lastName = validated_data.get('lastName', instance.lastName)
        instance.mobile_number = validated_data.get('mobile_number', instance.mobile_number)
        instance.healthComplication = validated_data.get('healthComplication', instance.healthComplication)
        instance.illness = validated_data.get('illness', instance.illness)
        instance.illness2 = validated_data.get('illness2', instance.illness2)
        instance.illness3 = validated_data.get('illness3', instance.illness3)
        instance.save()
        return instance

from rest_framework import serializers
from .models import SignUp

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUp
        fields = ['id', 'username', 'mobileNumber', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        if hasattr(SignUp.objects, 'create_user'):
            signup = SignUp.objects.create_user(**validated_data, password=password)
        else:
            signup = SignUp.objects.create(**validated_data)
        return signup
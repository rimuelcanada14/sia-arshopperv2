from rest_framework import serializers
from .models import SignUp
from django.contrib.auth.hashers import make_password  


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUp
        fields = ['id', 'firstName', 'lastName',  'password', 'mobileNumber', 'healthComplication']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)  
        signup = SignUp.objects.create(**validated_data)
        return signup
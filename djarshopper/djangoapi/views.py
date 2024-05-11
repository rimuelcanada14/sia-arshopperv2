from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import SignUp
from .serializers import SignUpSerializer
class UserCreateView(generics.CreateAPIView):
    queryset = SignUp.objects.all()
    serializer_class = SignUpSerializer
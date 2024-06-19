from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .models import SignUp, AddProduct
from .serializers import SignUpSerializer, AuthSerializer, DisplayProdSerializer, UpdateUserSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = SignUp.objects.all()
    serializer_class = SignUpSerializer

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = AuthSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        print(serializer.errors)  # Print the errors to the console
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductView(generics.ListAPIView):
    queryset = AddProduct.objects.all()
    serializer_class = DisplayProdSerializer

class ProductDetailView(APIView):
    def get(self, request, barcode, format=None):
        product = get_object_or_404(AddProduct, barcode=barcode)
        serializer = DisplayProdSerializer(product)
        return Response(serializer.data)

class UserDetailView(APIView):
    def get(self, request, mobile_number, format=None):
        try:
            user = SignUp.objects.get(mobile_number=mobile_number)
            user_data = {
                'firstName': user.firstName,
                'lastName': user.lastName,
                'mobile_number': user.mobile_number,
                'healthComplication': user.healthComplication,
                'illness': user.illness,
                'illness2': user.illness2,
                'illness3': user.illness3,
            }
            return Response(user_data, status=status.HTTP_200_OK)
        except SignUp.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, mobile_number, format=None):
        user = get_object_or_404(SignUp, mobile_number=mobile_number)
        serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

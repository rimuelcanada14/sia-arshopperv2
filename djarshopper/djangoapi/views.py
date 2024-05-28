from rest_framework import generics
from .models import SignUp
from .serializers import SignUpSerializer
from .serializers import AuthSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

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
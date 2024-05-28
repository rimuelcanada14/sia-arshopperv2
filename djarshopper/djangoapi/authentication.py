from django.contrib.auth.backends import ModelBackend
from .models import LoginUser

# class MobileNumberBackend(ModelBackend):
#     def authenticate(self, request, mobile_number=None, password=None, **kwargs):
#         if mobile_number is None or password is None:
#             return None
        
#         try:
#             print(f"Attempting to authenticate user with mobile number: {mobile_number}")  # Debug print
#             user = LoginUser.objects.get(mobile_number=mobile_number)
#             if user.check_password(password):
#                 print(f"Authentication successful for user: {user}")  # Debug print
#                 return user
#             else:
#                 print(f"Authentication failed: Incorrect password for mobile number {mobile_number}")  # Debug print
#         except LoginUser.DoesNotExist:
#             print(f"Authentication failed: Mobile number {mobile_number} not found")  # Debug print
#             return None

#     def get_user(self, user_id):
#         try:
#             return LoginUser.objects.get(pk=user_id)
#         except LoginUser.DoesNotExist:
#             return None

class MobileNumberBackend(ModelBackend):
    def authenticate(self, request, mobile_number=None, password=None, **kwargs):
        try:
            user = LoginUser.objects.get(mobile_number=mobile_number)
            if user.check_password(password):
                return user
        except LoginUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return LoginUser.objects.get(pk=user_id)
        except LoginUser.DoesNotExist:
            return None
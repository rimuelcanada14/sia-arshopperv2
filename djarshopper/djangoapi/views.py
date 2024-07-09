from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from .models import SignUp, AddProduct
from .serializers import SignUpSerializer, AuthSerializer, DisplayProdSerializer, UpdateUserSerializer, ChangePasswordSerializer
from .training.TrainingWithHealthStatus import get_recommendations_with_healthiness
import pandas as pd
import numpy as np
from django.http import JsonResponse
import os

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# CSV_PATH = os.path.join(BASE_DIR, 'djangoapi', 'training', 'TrainingTest2.csv')

# df = pd.read_csv(CSV_PATH)

# def get_product_recommendations(request, barcode):
#     product = get_object_or_404(AddProduct, barcode=barcode)
#     health_conditions = request.GET.get('health_conditions', '').split(',')
    
#     product_features = {
#         'ProductName': [product.name],
#         'Calories': [product.calories],
#         'TotalFat': [product.total_fat],
#         'SatFat': [product.sat_fat],
#         'TransFat': [product.trans_fat],
#         'Cholesterol': [product.cholesterol],
#         'Sodium': [product.sodium],
#         'TCarbs': [product.t_carbs],
#         'DietFbr': [product.diet_fbr],
#         'Tsugar': [product.tsugar],
#     }

#     recommendations = get_recommendations_with_healthiness(product_features, health_conditions)

#     # Convert recommendations to JSON serializable format
#     recommended_products = recommendations.to_dict('records')

#     return JsonResponse({'recommendations': recommended_products})

@api_view(['POST'])
def recommend_healthier_alternative(request):
    
    try:
        product_nutritional_facts = request.data.get('nutritional_facts', {})
        conditions = request.query_params.get('conditions', None)  # Optional query parameter for health conditions

        # Call your recommendation function
        recommendations = get_recommendations_with_healthiness(product_nutritional_facts, conditions)

        # Serialize recommendations using Django serializer
        serializer = DisplayProdSerializer(recommendations, many=True)
        return Response(serializer.data)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

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

class BeveragesView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='beverages')

class JunkFoodsView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='junk food')
    
class IceCreamView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='ice cream')
    
class FrozenGoodsView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='frozen goods')
    
class PastryView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='pastry')
    
class WaterView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='water')
    
class CondimentsView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='condiments')
    
class NoodlesPastaView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='noodlespasta')
    
class InstantNoodlesView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='instantnoodles')

class PowderedJuiceView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='powderedjuice')

class OilSectionView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='oilsection')

class BreadSpreadView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='breadspread')
    
class CannedGoodsView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='cannedgoods')

class NibblesView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='nibbles')

class CoffeeMilkView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='coffeemilk')
    
class BiscuitsView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='biscuits')
    
class CandiesView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='candies')
    
class ChocolatesView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='Chocolates')
    
class LiquorWinesView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='liquorwines')
    
class PartyUtensilsView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='partyutensils')
    
class ToiletriesView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='toiletries')
    
class DiswashingLaundryView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        return AddProduct.objects.filter(category='diswashinglaundry')


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

@api_view(['POST'])
def change_password(request, mobile_number):
    try:
        user = SignUp.objects.get(mobile_number=mobile_number)
    except SignUp.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ChangePasswordSerializer(data=request.data)
    if serializer.is_valid():
        current_password = serializer.validated_data['currentPassword']
        new_password = serializer.validated_data['newPassword']

        if not user.user.check_password(current_password):
            return Response({"error": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        user.user.set_password(new_password)
        user.user.save()
        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


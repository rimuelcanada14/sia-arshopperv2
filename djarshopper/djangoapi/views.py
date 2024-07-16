from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from .models import SignUp, AddProduct
from .serializers import SignUpSerializer, AuthSerializer, DisplayProdSerializer, UpdateUserSerializer, ChangePasswordSerializer, ToggleLikeProductSerializer
from .recommendation import get_recommendations_with_healthiness
import pandas as pd
import os
from django.conf import settings

class RecommendationView(APIView):
    def post(self, request):
        try:
            file_path = os.path.join(settings.BASE_DIR, 'djangoapi', 'DatasetWithPic.csv')
            print(f"Attempting to read CSV from path: {file_path}")
            df = pd.read_csv(file_path)

            product_features = request.data.get('product_features')
            conditions = request.data.get('conditions')
            category = request.data.get('category')

            recommendations = get_recommendations_with_healthiness(df, product_features, conditions, category)

            return Response(recommendations.to_dict(orient='records'), status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error reading CSV file: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def home(request):
    return render(request, 'home.html')

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

    def post(self, request, barcode, format=None):
        product = get_object_or_404(AddProduct, barcode=barcode)
        serializer = DisplayProdSerializer(product)
        return Response(serializer.data)

class ProductLocationView(APIView):
    def get(self, request, product_id, format=None):
        product = get_object_or_404(AddProduct, id=product_id)
        return Response({'location': product.location}, status=status.HTTP_200_OK)

class BeveragesView(generics.ListAPIView):
    serializer_class = DisplayProdSerializer
    
    def get_queryset(self):
        filteredProducts = AddProduct.objects.filter(category='beverages')
        
        # for product in filteredProducts:
        #     product.image = product.image.url
            
        return filteredProducts
            

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
                'liked_products': [product.name for product in user.user.liked_products.all()]
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

class ToggleLikeProduct(APIView):
    def post(self, request, product_id, format=None):
        try:
            product = get_object_or_404(AddProduct, id=product_id)
            user = get_object_or_404(SignUp, mobile_number=request.user.mobile_number)
            
            # Check if the product is already liked
            if product in user.user.liked_products.all():
                user.user.liked_products.remove(product)
                return Response({'message': 'Product unliked successfully.'}, status=status.HTTP_200_OK)
            else:
                user.user.liked_products.add(product)
                return Response({'message': 'Product liked successfully.'}, status=status.HTTP_200_OK)
        except SignUp.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        except AddProduct.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ToggleLikeProduct(APIView):
    def post(self, request, product_id, format=None):
        serializer = ToggleLikeProductSerializer(data={'product_id': product_id}, context={'request': request})
        if serializer.is_valid():
            response = serializer.save()
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LikedProductsView(APIView):
    def get(self, request):
        mobile_number = request.query_params.get('mobile_number')
        if not mobile_number:
            return Response({'error': 'Mobile number is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = SignUp.objects.get(mobile_number=mobile_number)
        except SignUp.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        liked_products = user.liked_products.all()  # Fetch liked products
        serializer = DisplayProdSerializer(liked_products, many=True)
        return Response(serializer.data)

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

@api_view(['POST'])
def add_to_liked_products(request, product_id):
    mobile_number = request.data.get('mobileNumber')
    if not mobile_number:
        return Response({'error': 'Mobile number is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = SignUp.objects.get(mobile_number=mobile_number)
    except SignUp.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    product = get_object_or_404(AddProduct, id=product_id)

    if product in user.liked_products.all():
        return Response({'message': 'Product already liked'}, status=status.HTTP_200_OK)
    else:
        user.liked_products.add(product)
        return Response({'message': 'Product liked'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def remove_from_liked_products(request, product_id):
    mobile_number = request.data.get('mobileNumber')
    if not mobile_number:
        return Response({'error': 'Mobile number is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = SignUp.objects.get(mobile_number=mobile_number)
    except SignUp.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    product = get_object_or_404(AddProduct, id=product_id)

    if product in user.liked_products.all():
        user.liked_products.remove(product)
        return Response({'message': 'Product unliked'}, status=status.HTTP_200_OK)
    else:
        user.liked_products.add(product)
        return Response({'message': 'Product liked'}, status=status.HTTP_200_OK)




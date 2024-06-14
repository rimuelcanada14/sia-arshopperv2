from django.urls import path
from djangoapi.views import UserCreateView, LoginView, ProductView, ProductDetailView

urlpatterns = [
    # path('hello-world/', views.hello_world, name='hello_world'),
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('products/', ProductView.as_view(), name='products'),
    path('products/<str:barcode>/', ProductDetailView.as_view(), name='product_details')

]
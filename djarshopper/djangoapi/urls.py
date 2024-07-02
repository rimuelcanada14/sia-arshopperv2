from django.urls import path
from .views import UserCreateView, LoginView, ProductView, ProductDetailView, UserDetailView, change_password, BeveragesView, JunkFoodsView, IceCreamView, FrozenGoodsView, PastryView, WaterView, CondimentsView, NoodlesPastaView, InstantNoodlesView, PowderedJuiceView, OilSectionView, BreadSpreadView, CannedGoodsView, NibblesView, CoffeeMilkView, BiscuitsView, CandiesView, ChocolatesView, LiquorWinesView, PartyUtensilsView, ToiletriesView, DiswashingLaundryView, toggle_like_product
                                              
                                            

urlpatterns = [
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('products/', ProductView.as_view(), name='products'),
    path('products/<str:barcode>/', ProductDetailView.as_view(), name='product_details'),
    path('beverages/', BeveragesView.as_view(), name='beverages'),
    path('junkfoods/', JunkFoodsView.as_view(), name='junkfoods'),
    path('icecream/', IceCreamView.as_view(), name='icecream'),
    path('frozengoods/', FrozenGoodsView.as_view(), name='frozengoods'),
    path('pastry/', PastryView.as_view(), name='pastry'),
    path('water/', WaterView.as_view(), name='water'),
    path('condiments/', CondimentsView.as_view(), name='condiments'),
    path('noodlespasta/', NoodlesPastaView.as_view(), name='noodlespasta'),
    path('instantnoodles/', InstantNoodlesView.as_view(), name='instantnoodles'),
    path('powderedjuice/', PowderedJuiceView.as_view(), name='powderedjuice'),
    path('oilsection/', OilSectionView.as_view(), name='oilsection'),
    path('breadspread/', BreadSpreadView.as_view(), name='breadspread'),
    path('cannedgoods/', CannedGoodsView.as_view(), name='cannedgoods'),
    path('nibbles/', NibblesView.as_view(), name='nibbles'),
    path('coffeemilk/', CoffeeMilkView.as_view(), name='coffeemilk'),
    path('biscuits/', BiscuitsView.as_view(), name='biscuits'),
    path('candies/', CandiesView.as_view(), name='candies'),
    path('chocolates/', ChocolatesView.as_view(), name='chocolates'),
    path('liquorwines/', LiquorWinesView.as_view(), name='liquorwines'),
    path('partyutensils/', PartyUtensilsView.as_view(), name='partyutensils'),
    path('toiletries/', ToiletriesView.as_view(), name='toiletries'),
    path('diswashinglaundry/', DiswashingLaundryView.as_view(), name='diswashinglaundry'),
    path('user-details/<str:mobile_number>/', UserDetailView.as_view(), name='user-details'),
    path('change-password/<str:mobile_number>/', change_password, name='change-password'),
    path('products/<int:product_id>/like/', toggle_like_product, name='toggle_like_product'),
]

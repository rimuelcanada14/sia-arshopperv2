from django.urls import path
from djangoapi.views import UserCreateView, LoginView

urlpatterns = [
    # path('hello-world/', views.hello_world, name='hello_world'),
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),

]
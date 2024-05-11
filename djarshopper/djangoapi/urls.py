from django.urls import path
from djangoapi.views import UserCreateView

urlpatterns = [
    # path('hello-world/', views.hello_world, name='hello_world'),
    path('signup/', UserCreateView.as_view(), name='signup'),

]
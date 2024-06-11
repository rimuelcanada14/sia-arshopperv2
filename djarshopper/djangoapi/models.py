from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

#handles the validation for the login
class MyLoginManager(BaseUserManager):
    def create_user(self, mobile_number, password=None, **extra_fields):
        if not mobile_number:
            raise ValueError('The Mobile Number field must be set')
        user = self.model(mobile_number=mobile_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, mobile_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(mobile_number, password, **extra_fields)
#for the login 
class LoginUser(AbstractBaseUser, PermissionsMixin):
    username = None
    mobile_number = models.BigIntegerField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = MyLoginManager()

    USERNAME_FIELD = 'mobile_number'
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.mobile_number)
    
# this is for the creation for new users
class SignUp(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    mobile_number = models.BigIntegerField(null=True, blank=True)
    password = models.CharField(max_length=128)
    healthComplication = models.CharField(
        max_length=3,
        choices=[
            ('yes', 'I have health complications'),
            ('no', 'I do not have health complications'),
        ],
        default='no'
    )
    user = models.OneToOneField(LoginUser, on_delete=models.CASCADE, default=1)  # Add a default value for initial migration

    def __str__(self):
        return f'{self.firstName} {self.lastName} - {self.mobile_number}'

#crud for the admin panel
class AddProduct(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    ingredients = models.TextField()
    nutritional_facts = models.TextField()
    image = models.ImageField(upload_to='djangoapi/ProductImage')
    
    def __str__(self):
        return self.name
    

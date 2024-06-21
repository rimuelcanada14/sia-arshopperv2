from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Handles the validation for the login
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

# For the login 
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
    
# This is for the creation of new users
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
    illness = models.CharField(
        max_length=50,
        choices=[
            ('respiratory', 'Respiratory Infections'),
            ('hypertension', 'Hypertension'),
            ('uti', 'Urinary Tract Infection'),
            ('animal', 'Animal Bites'),
            ('skin', 'Skin Diseases'),
            ('pneumonia', 'Pneumonia'),
            ('diarrhea', 'Diarrhea'),
            ('null', ''),
        ],
        default='null'
    )
    illness2 = models.CharField(
        max_length=50,
        choices=[
            ('respiratory', 'Respiratory Infections'),
            ('hypertension', 'Hypertension'),
            ('uti', 'Urinary Tract Infection'),
            ('animal', 'Animal Bites'),
            ('skin', 'Skin Diseases'),
            ('pneumonia', 'Pneumonia'),
            ('diarrhea', 'Diarrhea'),
            ('null2', ''),
        ],
        default='null2'
    )
    illness3 = models.CharField(
        max_length=50,
        choices=[
            ('respiratory', 'Respiratory Infections'),
            ('hypertension', 'Hypertension'),
            ('uti', 'Urinary Tract Infection'),
            ('animal', 'Animal Bites'),
            ('skin', 'Skin Diseases'),
            ('pneumonia', 'Pneumonia'),
            ('diarrhea', 'Diarrhea'),
            ('null3', ''),
        ],
        default='null'
    )
    user = models.OneToOneField(LoginUser, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.firstName} {self.lastName} - {self.mobile_number}'

# CRUD for the admin panel
class AddProduct(models.Model):
    
    CATEGORY_CHOICES = [
        ('beverages', 'Beverages'),
        ('junk food', 'Junk Food'),
        ('ice cream', 'Ice Cream'),
        ('frozen goods', 'Frozen Goods'),
        ('pastry', 'Pastry'),
        ('noodles/pasta', 'Noodles/Pasta'),
        ('instant noodles', 'Instant Noodles'),
        ('nibbles', 'Nibbles'),
        ('coffee/milk', 'Coffee/Milk'),
        ('biscuits', 'Biscuits'),
        ('candies', 'Candies'),
        ('liqour/wines', 'Liqour/Wines'),
        ('canned goods', 'Canned Goods'),
    ]    
    
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    ingredients = models.TextField()
    nutritional_facts = models.TextField()
    image = models.ImageField(upload_to='djangoapi/ProductImage')
    barcode = models.CharField(max_length=13, null=True)
    category = models.CharField(max_length=50, null=True, choices=CATEGORY_CHOICES)
    
    
    def __str__(self):
        return self.name

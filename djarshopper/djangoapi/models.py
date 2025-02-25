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
    liked_products = models.ManyToManyField('AddProduct', related_name='liked_by', blank=True)

    objects = MyLoginManager()

    USERNAME_FIELD = 'mobile_number'
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.mobile_number)
    


# CRUD for the admin panel
class AddProduct(models.Model):
    
    CATEGORY_CHOICES = [
        ('beverages', 'Beverages'),
        ('junkfood', 'Junk Food'),
        ('icecream', 'Ice Cream'),
        ('frozengoods', 'Frozen Goods'),
        ('pastry', 'Pastry'),
        ('water', 'Water'),
        ('condiments', 'Condiments'),
        ('noodlespasta', 'NoodlesPasta'),
        ('instantnoodles', 'InstantNoodles'),
        ('powderedjuice', 'Powdered Juice'),
        ('oilsection', 'Oil Section'),
        ('breadspread', 'Bread Spread'),
        ('cannedgoods', 'Canned Goods'),
        ('nibbles', 'Nibbles'),
        ('coffee/milk', 'Coffee/Milk'),
        ('biscuits', 'Biscuits'),
        ('candies', 'Candies'),
        ('chocolates', 'Chocolates'),
        ('liqour/wines', 'Liqour/Wines'),
        ('partyutensils', 'Party Utensils'),
        ('toiletries', 'Toiletries'),
        ('diswashing/laundry', 'Diswashing/Laundry'),   
    ]    
    
    LOCATION_CHOICES = [(str(i), str(i)) for i in range(1, 23)]  # Dropdown with numbers 1 to 22

    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    ingredients = models.TextField()
    nutritional_facts = models.TextField()
    image = models.ImageField(upload_to='djangoapi/ProductImage')
    barcode = models.CharField(max_length=13, null=True)
    category = models.CharField(max_length=50, null=True, choices=CATEGORY_CHOICES)
    glb_file = models.FileField(upload_to='djangoapi/GLBFiles', null=True, blank=True, help_text='Upload a .glb file')
    location = models.CharField(max_length=2, choices=LOCATION_CHOICES, null=True, blank=True)
    
    class Meta:
        verbose_name = "Product"  # Singular name
        verbose_name_plural = "Products"  # Plural name
        
    def __str__(self):
        return self.name

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
            ('kidney', 'Kidney Diseases'),
            ('hypertension', 'Hypertension'),
            ('uti', 'Urinary Tract Infection'),
            ('diabetes', 'Diabetes'),
            ('skin', 'Skin Diseases'),
            ('gastrointestinal', 'Gastrointestinal Diseases'),
            ('liver', 'Liver Diseases'),
            ('null', ''),
        ],
        default='null'
    )
    illness2 = models.CharField(
        max_length=50,
        choices=[
            ('kidney', 'Kidney Diseases'),
            ('hypertension', 'Hypertension'),
            ('uti', 'Urinary Tract Infection'),
            ('diabetes', 'Diabetes'),
            ('skin', 'Skin Diseases'),
            ('gastrointestinal', 'Gastrointestinal Diseases'),
            ('liver', 'Liver Diseases'),
            ('null2', ''),
        ],
        default='null2'
    )
    illness3 = models.CharField(
        max_length=50,
        choices=[
            ('kidney', 'Kidney Diseases'),
            ('hypertension', 'Hypertension'),
            ('uti', 'Urinary Tract Infection'),
            ('diabetes', 'Diabetes'),
            ('skin', 'Skin Diseases'),
            ('gastrointestinal', 'Gastrointestinal Diseases'),
            ('liver', 'Liver Diseases'),
            ('null3', ''),
        ],
        default='null3'
    )
    user = models.OneToOneField(LoginUser, on_delete=models.CASCADE)
    liked_products = models.ManyToManyField(AddProduct, related_name='liked_by_users', blank=True)
    
    
    
    def __str__(self):
        return f'{self.firstName} {self.lastName} - {self.mobile_number}'
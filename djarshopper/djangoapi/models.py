from django.db import models

# Create your models here.
class SignUp(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    mobileNumber = models.BigIntegerField(null=True, blank=True)
    password = models.CharField(max_length=128)

    healthComplicationsChoices =[
        ('yes', 'I have health complications'),
        ('no', 'I do not have health complications'),
        
    ]    
    
    healthComplication = models.CharField(
        max_length=3,
        choices=healthComplicationsChoices,
        default='no'
    )
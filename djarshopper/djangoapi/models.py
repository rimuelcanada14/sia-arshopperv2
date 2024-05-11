from django.db import models

# Create your models here.
class SignUp(models.Model):
    username = models.CharField(max_length=100)
    mobileNumber = models.BigIntegerField(null=True, blank=True)
    password = models.CharField(max_length=11)
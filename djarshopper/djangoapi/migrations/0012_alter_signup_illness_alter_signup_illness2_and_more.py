# Generated by Django 5.0.3 on 2024-06-28 05:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangoapi', '0011_alter_addproduct_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='signup',
            name='illness',
            field=models.CharField(choices=[('respiratory', 'Respiratory Infections'), ('hypertension', 'Hypertension'), ('uti', 'Urinary Tract Infection'), ('diabetes', 'Diabetes'), ('skin', 'Skin Diseases'), ('pneumonia', 'Pneumonia'), ('diarrhea', 'Diarrhea'), ('null', '')], default='null', max_length=50),
        ),
        migrations.AlterField(
            model_name='signup',
            name='illness2',
            field=models.CharField(choices=[('respiratory', 'Respiratory Infections'), ('hypertension', 'Hypertension'), ('uti', 'Urinary Tract Infection'), ('diabetes', 'Diabetes'), ('skin', 'Skin Diseases'), ('pneumonia', 'Pneumonia'), ('diarrhea', 'Diarrhea'), ('null2', '')], default='null2', max_length=50),
        ),
        migrations.AlterField(
            model_name='signup',
            name='illness3',
            field=models.CharField(choices=[('respiratory', 'Respiratory Infections'), ('hypertension', 'Hypertension'), ('uti', 'Urinary Tract Infection'), ('diabetes', 'Diabetes'), ('skin', 'Skin Diseases'), ('pneumonia', 'Pneumonia'), ('diarrhea', 'Diarrhea'), ('null3', '')], default='null', max_length=50),
        ),
    ]

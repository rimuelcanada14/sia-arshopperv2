# Generated by Django 5.0.6 on 2024-07-12 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('djangoapi', '0015_alter_signup_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='addproduct',
            options={'verbose_name': 'Product', 'verbose_name_plural': 'Products'},
        ),
        migrations.AlterModelOptions(
            name='signup',
            options={},
        ),
    ]

# Generated by Django 5.0.3 on 2024-07-17 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangoapi', '0020_alter_addproduct_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addproduct',
            name='category',
            field=models.CharField(choices=[('beverages', 'Beverages'), ('junkfood', 'Junk Food'), ('icecream', 'Ice Cream'), ('frozengoods', 'Frozen Goods'), ('pastry', 'Pastry'), ('water', 'Water'), ('condiments', 'Condiments'), ('noodlespasta', 'NoodlesPasta'), ('instantnoodles', 'InstantNoodles'), ('powderedjuice', 'Powdered Juice'), ('oilsection', 'Oil Section'), ('breadspread', 'Bread Spread'), ('cannedgoods', 'Canned Goods'), ('nibbles', 'Nibbles'), ('coffee/milk', 'Coffee/Milk'), ('biscuits', 'Biscuits'), ('candies', 'Candies'), ('chocolates', 'Chocolates'), ('liqour/wines', 'Liqour/Wines'), ('partyutensils', 'Party Utensils'), ('toiletries', 'Toiletries'), ('diswashing/laundry', 'Diswashing/Laundry')], max_length=50, null=True),
        ),
    ]

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import LoginUser, AddProduct
from .forms import UserChangeForm, UserCreationForm

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('mobile_number', 'is_staff', 'is_active')
    search_fields = ('mobile_number',)
    ordering = ('mobile_number',)
    fieldsets = (
        (None, {'fields': ('mobile_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('mobile_number', 'password1', 'password2'),
        }),
    )

admin.site.register(LoginUser, UserAdmin)

#this is for fetching data from the database to display products

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'ingredients', 'nutritional_facts', 'price', 'barcode')
    search_fields = ('name',)
    list_filter = ('price',)

admin.site.register(AddProduct, ProductAdmin)


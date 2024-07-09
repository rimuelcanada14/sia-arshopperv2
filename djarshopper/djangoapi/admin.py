from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import LoginUser, AddProduct
from .forms import UserChangeForm, UserCreationForm

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('mobile_number', 'get_first_name', 'get_last_name', 'get_illness', 'get_illness2', 'get_illness3', 'is_staff', )
    search_fields = ('mobile_number', 'signup__firstName', 'signup__lastName', 'signup__illness')
    ordering = ('mobile_number',)
    fieldsets = (
        (None, {'fields': ('mobile_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('mobile_number', 'password1', 'password2'),
        }),
    )

    def get_first_name(self, obj):
        return obj.signup.firstName
    get_first_name.admin_order_field = 'signup__firstName'
    get_first_name.short_description = 'First Name'
    
    def get_last_name(self, obj):
        return obj.signup.lastName
    get_last_name.admin_order_field = 'signup__lastName'
    get_last_name.short_description = 'Last Name'
    
    def get_illness(self, obj):
        return obj.signup.illness
    get_illness.admin_order_field = 'signup__illness'
    get_illness.short_description = 'Illness'
    
    def get_illness2(self, obj):
        return obj.signup.illness2
    get_illness2.admin_order_field = 'signup__illness'
    get_illness2.short_description = '2nd Illness'
    
    def get_illness3(self, obj):
        return obj.signup.illness3
    get_illness3.admin_order_field = 'signup__illness'
    get_illness3.short_description = '3rd Illness'

    def change_view(self, request, object_id, form_url='', extra_context=None):
        if extra_context is None:
            extra_context = {}
        extra_context['show_save_and_continue'] = False
        return super().change_view(request, object_id, form_url, extra_context=extra_context)

    def add_view(self, request, form_url='', extra_context=None):
        if extra_context is None:
            extra_context = {}
        extra_context['show_save_and_continue'] = False
        return super().add_view(request, form_url, extra_context=extra_context)

admin.site.register(LoginUser, UserAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'barcode', 'ingredients', 'nutritional_facts',)
    search_fields = ('name',)
    list_filter = ('price', 'category')

    def change_view(self, request, object_id, form_url='', extra_context=None):
        if extra_context is None:
            extra_context = {}
        extra_context['show_save_and_continue'] = False
        return super().change_view(request, object_id, form_url, extra_context=extra_context)

    def add_view(self, request, form_url='', extra_context=None):
        if extra_context is None:
            extra_context = {}
        extra_context['show_save_and_continue'] = False
        return super().add_view(request, form_url, extra_context=extra_context)

admin.site.register(AddProduct, ProductAdmin)

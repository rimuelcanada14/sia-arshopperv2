from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import LoginUser, AddProduct, SignUp
from .forms import UserCreationForm, UserChangeForm

class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = LoginUser
        fields = ('mobile_number',)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = LoginUser
        fields = ('mobile_number', 'password', 'is_active', 'is_staff', 'is_superuser')

    def clean_password(self):
        return self.initial["password"]

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('mobile_number', 'get_first_name', 'get_last_name', 'get_illness', 'get_illness2', 'get_illness3', 'is_staff')
    search_fields = ('mobile_number', 'signup__firstName', 'signup__lastName', 'signup__illness')
    ordering = ('mobile_number',)
    fieldsets = (
        (None, {'fields': ('mobile_number', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    readonly_fields = ('get_first_name', 'get_last_name', 'get_illness', 'get_illness2', 'get_illness3')
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

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if obj:
            form.base_fields['password'].help_text = (
                "Raw passwords are not stored, so there is no way to see this user's password, "
                "but you can change the password using <a href='../password/'>this form</a>."
            )
        else:
            form.base_fields['password1'] = forms.CharField(label='Password', widget=forms.PasswordInput)
            form.base_fields['password2'] = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)
        return form

    def save_model(self, request, obj, form, change):
        if 'password1' in form.cleaned_data and form.cleaned_data['password1']:
            obj.set_password(form.cleaned_data['password1'])
        super().save_model(request, obj, form, change)

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

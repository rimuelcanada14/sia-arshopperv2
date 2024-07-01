"""
Django settings for djarshopper project.

Generated by 'django-admin startproject' using Django 5.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-$tvoe_(bia4g&qt0vg!fw52^1c#173d16pljvs12q4+yl*@!4t'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['192.168.1.13', 'localhost', '127.0.0.1', '192.168.100.90', '192.168.100.134', '192.168.1.17', '192.168.100.7', '192.168.1.19', ]


# Application definition

# SECURE_SSL_REDIRECT = True
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'djangoapi',
    'rest_framework.authtoken',
    'sslserver',
]

SSL_CERT = 'cert.pem'
SSL_KEY = 'key.pem'


AUTHENTICATION_BACKENDS = [
    'djangoapi.authentication.MobileNumberBackend',
    'django.contrib.auth.backends.ModelBackend',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]
JAZZMIN_SETTINGS = {
    'usermenu_links': [{"name": "Support", "url": "https://github.com/farridav/django-jazzmin/issues", "new_window": True},],

    'welcome_sign': "Welcome to IchiMart Admin Panel",
    'login_logo': None,
    'site_title': "IchiMart",
    'site_brand': "IchiMart Admin", 
    'hide_models': ["auth.Group"],
}

DEBUG = TEMPLATE_DEBUG = True

JAZZMIN_UI_TWEAKS = {
    'theme': 'pulse',
}
#PAG TINANGGAL MO COMMENT NITO MAKIKITA MO UI PREVIEWER NG LIBRARY SA ADMIN
# JAZZMIN_SETTINGS["show_ui_builder"] = True

CORS_ORIGIN_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    'https://localhost:3000',
    'https://localhost:8000',
    'https://192.168.1.14:8000',
    'https://192.168.1.14:3000',
    'https://192.168.100.90:8000',
    'https://192.168.100.90:3000'
    
]
CORS_ALLOW_CREDENTIALS = True
# SECURE_SSL_REDIRECT = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}

ROOT_URLCONF = 'djarshopper.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djarshopper.wsgi.application'

AUTH_USER_MODEL = 'djangoapi.LoginUser'
# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'sqlpass',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# settings.py


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
#in order to store images from crud into react public folder
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# this handles the media files settings
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

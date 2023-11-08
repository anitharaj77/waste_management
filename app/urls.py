from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from django.conf import settings
from . import views

urlpatterns = [
    path('landing/', views.landing, name='landing'),
    path('', views.landing, name='landing'),
    path('login/', auth_views.LoginView.as_view(template_name='account/login.html'), name='login'),
    path('up/', views.up, name='up'),
    path('upload/', views.image_upload_view)

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
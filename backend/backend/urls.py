"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from main import views
from django.contrib.auth.views import LogoutView

router = routers.SimpleRouter()
router.register(r'ticket', views.CreateTicketView,basename='ticket')
router.register(r'signup',views.SingUpView,'signup')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/',views.LoginView.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('isauthenticated/',views.CheckIsAuthenticated.as_view(),name='auth'),
    path('',include(router.urls)),
]

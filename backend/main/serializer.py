from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from main import models
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SignUp
        fields = '__all__'
    
    def validate_password(self,value):
        return make_password(value)

    


class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CreateTicket
        fields = '__all__'


class RespondTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RespondTicket
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    



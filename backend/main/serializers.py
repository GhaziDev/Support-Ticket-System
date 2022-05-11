from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from main import models
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class TokenObtainPairSerializer(TokenObtainSerializer):
    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data["username"] = self.user.id

        if api_settings:
            update_last_login(None, self.user)

        return data

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




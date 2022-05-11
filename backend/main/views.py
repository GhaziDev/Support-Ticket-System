from django.shortcuts import render
from main import serializers
from main import models
from rest_framework import viewsets,views

from django.contrib.auth.models import User

from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenViewBase




class SingUpView(viewsets.ModelViewSet):
    serializer_class = serializers.SignUpSerializer
    def create(self,request):
        data = serializers.SignUpSerializer(data=request.data)
        if data.is_valid():
            user_obj = User.objects.create(username=data['email'].value,
            password=data['password'].value)
            user_obj.save()
            
            return Response({"status": "success"})
        return Response({"status": "fail"})
    def get_queryset(self):
        return None

class CreateTicketView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.CreateTicketSerializer
    def get_queryset(self):
        queryset = models.CreateTicket.objects.filter(user=self.request.user)
        return queryset

    def create(self,request):
        data = serializers.CreateTicketSerializer(data = request.data)
        print(data.is_valid())
        print(data.errors)
        if data.is_valid():
            obj = models.CreateTicket.objects.create(user=request.user, title=data.validated_data['title'],desc=data.validated_data['desc'])
            obj.save()
            return Response({"object": "created"})
        else:
            return Response({"object": "fail to create"})
    

class TokenObtainPairView(TokenViewBase):
    serializer_class = serializers.TokenObtainPairSerializer
        

        



# Create your views here.

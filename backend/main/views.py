from django.shortcuts import render
from main import serializer
from main import models
from rest_framework import viewsets,views

from django.contrib.auth.models import User

from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenViewBase
from django.contrib.auth import login, authenticate

from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator

class CheckIsAuthenticated(views.APIView):
    def get(self,request):
        print(request.user)
        if request.user.is_authenticated:
            return Response(request.user.username,status=200)
        return Response("no user is authneticated",status=401)

class SingUpView(viewsets.ModelViewSet):
    serializer_class = serializer.SignUpSerializer
    def create(self,request):
        data = serializer.SignUpSerializer(data=request.data)
        if data.is_valid():
            user_obj = User.objects.create(username=data['email'].value,
            password=data['password'].value)
            user_obj.save()
            
            return Response("Success",status=200)
        return Response("Fail",status=400)
    def get_queryset(self):
        return None

class CreateTicketView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializer.CreateTicketSerializer
    def get_queryset(self):
        queryset = models.CreateTicket.objects.filter(user=self.request.user)
        return queryset

    @method_decorator(ensure_csrf_cookie,csrf_protect)
    def create(self,request):
        data = serializer.CreateTicketSerializer(data = request.data)
        print(data.is_valid())
        print(data.errors)
        if data.is_valid():
            obj = models.CreateTicket.objects.create(user=request.user, title=data.validated_data['title'],desc=data.validated_data['desc'])
            obj.save()
            return Response("Ticket sent!")
        else:
            return Response("Ticket not sent")
    
class LoginView(views.APIView):
    serializer_class = serializer.LoginSerializer
    def post(self,request):
        data = serializer.LoginSerializer(data=request.data)
        print(data.is_valid())
        print(data.errors)
        if data.is_valid():
            email = data.data['email']
            password = data.data['password']
            auth = authenticate(username=email, password=password)
            if auth:
                login(request,auth)
                return Response("Success!")
            else:
                if email == "" and password == "":
                    return Response("email and password fields are empty",status=400)
                elif email =="":
                    return Response ("email field is empty",status=400)
                elif password =="":
                    return Response("password field is empty",status=400)
                else:
                    return Response("email or password is wrong",status=400)
        return Response("email and password fields are empty",status=400)

        

        



# Create your views here.

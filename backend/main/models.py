from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail

class SignUp(models.Model):
    email = models.EmailField(max_length=320)
    password = models.CharField(max_length=128)


class CreateTicket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='user_ticket')
    title = models.CharField(max_length=320)
    desc = models.TextField()
    is_solved = models.BooleanField(default=False)  # not shown in the client

    def __str__(self):
        return f"User : {self.user}, Title : {self.title}, Description : {self.desc}, status : {self.is_solved}"


class RespondTicket(models.Model):
    ticket = models.ForeignKey(CreateTicket, on_delete=models.CASCADE)
    to = models.EmailField(max_length=320)
    desc = models.TextField()

    def save(self):
        self.ticket.is_solved = True
        send_mail(f'Response to {self.ticket.title}',self.desc,None,[str(self.to)])
        super().save()




# Create your models here.

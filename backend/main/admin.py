from django.contrib import admin
from main import models


class CreateTicketAdmin(admin.ModelAdmin):
    list_display = ('__str__',)
    class Meta:
        model = models.CreateTicket
class RespondTicketAdmin(admin.ModelAdmin):
    list_display = ('__str__',)
    class Meta:
        model = models.RespondTicket


admin.site.register(models.RespondTicket, RespondTicketAdmin)
admin.site.register(models.CreateTicket,CreateTicketAdmin)
# Register your models here.

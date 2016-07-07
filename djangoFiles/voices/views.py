#from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from voices.models import *
# from voices.forms import * 

def index(request):
    all_prod = Products.objects.all()
    template = loader.get_template('voices/index.html')
    context = {'all_prod': all_prod,}
    return HttpResponse(template.render(context, request))

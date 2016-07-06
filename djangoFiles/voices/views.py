from django.shortcuts import render
from voices.models import *
# from voices.forms import * 

def index(request):
    return render(request, 'voices/index.html')

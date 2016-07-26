from django.shortcuts import render
from django.http import HttpResponse
from voices.models import *
from django.shortcuts import render_to_response
import sys
from datetime import datetime

def index(request):
    template = loader.get_template('requestList/index.html')
    allRequests = Request.objects.all()
    context = {'allRequests' : allRequests}
    return HttpResponse(template.render(context, request))
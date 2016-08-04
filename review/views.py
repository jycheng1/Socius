from django.shortcuts import render
from django.http import JsonResponse
from django.template import loader
from voices.models import *
from django.shortcuts import render_to_response
import sys
from datetime import datetime

def index(request):
    context={}
    return render(request, 'review/index.html', context)

def requestTable(request):
    allRequests = Request.objects.all()
    # allFields = Request._meta.get_fields()

    context = {'allRequests' : allRequests,
              }
    return render(request, 'review/requestTable.html', context)

def donationTable(request):
    allDonation = Donation.objects.all()
    context = {'allDonation' : allDonation,
              }
    return render(request, 'review/donationTable.html', context)
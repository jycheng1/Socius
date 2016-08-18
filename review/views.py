from django.shortcuts import render
from django.http import JsonResponse
from django.template import loader
from voices.models import *
from django.shortcuts import render_to_response
import sys
from datetime import datetime
from dashboard.models import *

from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.views import login as redirect_login

def index(request):
    return requestTable(request)

@login_required
def requestTable(request):
    userProfile = UserProfile.objects.get(username = request.user.username)
    org = Organization.objects.get(userProfile = userProfile)
    allRequests = org.requests.all()
    # allFields = Request._meta.get_fields()

    context = {'allRequests' : allRequests,
              }
    return render(request, 'review/requestTable.html', context)

@login_required
def donationTable(request):
    userProfile = UserProfile.objects.get(username = request.user.username)
    org = Organization.objects.get(userProfile = userProfile)
    allDonation = org.donations.all()
    context = {'allDonation' : allDonation,
              }
    return render(request, 'review/donationTable.html', context)
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
from voices.models import *
from django.shortcuts import render_to_response
import sys
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

def index(request):
  template = loader.get_template('requestList/index.html')
  allRequests = Request.objects.all()
  allFields = Request._meta.get_fields()

  context = {'allRequests' : allRequests,
             }
  return HttpResponse(template.render(context, request))

@csrf_exempt
def request1(request):
  if request.method == 'POST':
    template = loader.get_template('requestList/index.html')
    sortType = request.POST.get('sortType')
    requests = Request.objects.order_by(sortType)
    # allFields = Request._meta.get_fields()


    context = {'allRequests' : requests,
               }

    return HttpResponse(template.render(context, request))

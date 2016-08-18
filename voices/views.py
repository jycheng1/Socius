from django.shortcuts import render
from django.http import JsonResponse
from django.template import loader

from dashboard.models import *
from voices.models import *
from voices.forms import * 
from django.shortcuts import render_to_response
from formtools.wizard.views import SessionWizardView
from django.db.models import F
from django.contrib.auth.decorators import login_required, user_passes_test


import logging
import json
import sys
from datetime import datetime
logr = logging.getLogger(__name__)



# check if the current user type is Org User
def org_check(user):
    userProfile = UserProfile.objects.get(username = user.username)

    return userProfile.user_type == "O"


@login_required
@user_passes_test(org_check)
def index(request):
    context = {}
    return render(request, 'voices/index.html', context)


@login_required
@user_passes_test(org_check)
def items(request):

    userProfile = UserProfile.objects.get(username = request.user.username)
    org = userProfile.org
    
    produce = Product.objects.filter(organization = org, product_type="FP")
    canned = Product.objects.filter(organization = org, product_type="CS")
    boxed = Product.objects.filter(organization = org, product_type="BM")
    grains = Product.objects.filter(organization = org, product_type="GR")
    household = Product.objects.filter(organization = org, product_type="HE")
    clothing = Product.objects.filter(organization = org, product_type="CL")

    context = {'produce': produce,
                'canned': canned,
                'boxed': boxed,
                'grains': grains,
                'household': household,
                'clothing': clothing}


    if request.method == 'POST':
        satisfactionData = request.POST.get('faceChosen')
        context = {'satisfactionData': satisfactionData,
                   'produce': produce,
                   'canned': canned,
                   'boxed': boxed,
                   'grains': grains,
                   'household': household,
                   'clothing': clothing
               }

        return render(request, 'voices/items.html', context)

    else:
        produce = Product.objects.filter(prodType="produce")
        canned = Product.objects.filter(prodType="canned")
        boxed = Product.objects.filter(prodType="boxed")
        grains = Product.objects.filter(prodType="grainsBeans")
        household = Product.objects.filter(prodType="household")
        clothing = Product.objects.filter(prodType="clothing")

        context = {'produce': produce,
                   'canned': canned,
                   'boxed': boxed,
                   'grains': grains,
                   'household': household,
                   'clothing': clothing}

        return render(request, 'voices/items.html', context)

@login_required
@user_passes_test(org_check)
def cart(request):
    if request.method == 'POST':
        chosen = request.POST.getlist('ab[]')
        why = request.POST.getlist('why[]')
        satisfactionData = request.POST.get('faceChosen')
        suggestedItems = request.POST.get('suggestions')
       
        chosenObj = []
        itemsDict = dict()

        for i in range(len(chosen)):
            chosenObj.append(Product.objects.get(pk=chosen[i]))

        for i in range(len(chosen)):
            itemsDict[Product.objects.get(pk=chosen[i])] = why[i]


        context = {'itemsDict' : itemsDict,
                   'prodChosen': chosenObj,
                   'why': why,
                   'suggestions': suggestedItems,
                   'satisfactionData': satisfactionData,
                   }

        return render(request, 'voices/cart.html', context)
    else:
        context = {}
        return render(request, 'voices/cart.html', context)

@login_required
@user_passes_test(org_check)
def thanks(request):
    if request.method == 'POST':
        chosen = request.POST.getlist('selected[]')
        why = request.POST.getlist('whyReason[]')
        suggestedItems = request.POST.get('suggestions')
        satisfactionData = request.POST.get('faceChosen')

        zipcode = request.POST.get('zipcode')
        bday = request.POST.get('bday')
        gender = request.POST.get('gender')
        ethnicitySel = request.POST.get('ethnicitySel')
        diet = request.POST.get('dietRest')
        religiousDiet = request.POST.get('religiousDiet')

        reqFin = Request()
        for i in range(len(chosen)):
            Product.objects.filter(pk=chosen[i]).update(quantity=F('quantity') + 1)
            product = Product.objects.get(pk=chosen[i])
            if i == 0:
                reqFin.request1 = product.name
            elif i == 1:
                reqFin.request2 = product.name
            elif i == 2:
                reqFin.request3 = product.name

        for i in range(len(why)):
            if i == 0:
                reqFin.why1 = why[i]
            elif i == 1:
                reqFin.why2 = why[i]
            elif i == 2:
                reqFin.why3 = why[i]

        if suggestedItems is None:
            reqFin.additionalItems = "undefined"
        else:
            reqFin.additionalItems=suggestedItems
            
        if satisfactionData is None:
            reqFin.satisfaction = "undefined"
        else:
            reqFin.satisfaction=satisfactionData


        # reqFin.additionalItems=suggestedItems
        # reqFin.satisfaction=satisfactionData
        reqFin.ethnicity=ethnicitySel
        reqFin.zipcode=zipcode
        reqFin.birthday=bday
        reqFin.gender=gender
        reqFin.diet = diet
        reqFin.religiousDiet = religiousDiet
        userProfile = UserProfile.objects.get(username = request.user.username)
        org = userProfile.org
        reqFin.organization = org
        reqFin.save()

        # print(reqFin.zipcode, file=sys.stderr)

        context = {'thanks': 'Thank you for your time'
                   }

        return render(request, 'voices/thanks.html', context)
    else:
        context = {}
        return render(request, 'voices/thanks.html', context)

@login_required
@user_passes_test(org_check)
def satisfaction(request):
    context = {}
    return render(request, 'voices/satisfaction.html', context)
    



'''
def process_form_data(form_list):
    # add to db
    form_data = [form.cleaned_data for form in form_list]

    # adds into db
    elem = Request(request1 = form_data[0]['request1'], 
                   request2 = form_data[0]['request2'], 
                   request3 = form_data[0]['request3'], 
                   why = form_data[1]['why'], )
    elem.save()

    return form_data

class ContactWizard(SessionWizardView):
    # template_name = "voices/voices_form.html"

    def get_template_names(self):
        return [TEMPLATES[self.steps.current]]
    

    def done(self, form_list, **kwargs):
        form_data = process_form_data(form_list)
        return render_to_response('voices/done.html', {'form_data':form_data}) 
        # prints out data in the form

'''


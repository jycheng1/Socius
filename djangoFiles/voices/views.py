from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
from voices.models import *
from voices.forms import * 
from django.shortcuts import render_to_response
from formtools.wizard.views import SessionWizardView
import logging
import json
import sys
logr = logging.getLogger(__name__)


TEMPLATES = { "voices" : "voices/index.html",
              "cart" : "voices/cart.html"
            }

def index(request):
    all_prod = Products.objects.all()
    template = loader.get_template('voices/index.html')
    context = {'all_prod': all_prod,}
    return HttpResponse(template.render(context, request))

class ContactWizard(SessionWizardView):
    # template_name = "voices/voices_form.html"

    def get_template_names(self):
        return [TEMPLATES[self.steps.current]]
    

    def done(self, form_list, **kwargs):
        form_data = process_form_data(form_list)
        return render_to_response('voices/done.html', {'form_data':form_data}) 
        # prints out data in the form

def process_form_data(form_list):
    # add to db
    form_data = [form.cleaned_data for form in form_list]

    # prints it onto shell
    logr.debug(form_data[0]['request1'])
    logr.debug(form_data[0]['request2'])
    logr.debug(form_data[0]['request3'])
    logr.debug(form_data[1]['why'])

    # adds into db
    elem = Request(request1 = form_data[0]['request1'], 
                   request2 = form_data[0]['request2'], 
                   request3 = form_data[0]['request3'], 
                   why = form_data[1]['why'], )
    elem.save()

    return form_data

'''
def changeList(request, product_id):
    elem = Request(request1 = product_id, request2="a", request3 = "b", why = "al")
    elem.save() 
    return render(request, 'voices/index.html')
    # return JsonResponse({'success': True})
'''

def cart(request):
    if request.method == 'POST':
        chosen = request.POST.getlist('ab[]')
        print(chosen, file=sys.stderr)
        chosenObj = []

        for i in range(len(chosen)):
            chosenObj.append(Products.objects.get(pk=chosen[i]))

        template = loader.get_template('voices/cart.html')
        context = {'prodChosen': chosenObj,}

        return HttpResponse(template.render(context, request))
    else:
        template = loader.get_template('voices/cart.html')
        context = {}
        # return HttpRepsonse('fail')
        return HttpResponse(template.render(context, request))




    '''
    a = []
    for i in range(len(chosen)):
        a[i] = Products.objects.get(pk=chosen[i])
    '''


























"""
    e = "why"
   
    #print(request.POST.get('elems'), file=sys.stderr)
    # if request.method == 'POST':
    prodChosen = json.loads(request.POST.get('elems'))
    print(json.loads(request.POST.get('elems')), file=sys.stderr)

    

    template = loader.get_template('voices/cart.html')
    context = {'prodChosen': prodChosen,
                'e': e}

    # print(context, file=sys.stderr)
    return HttpResponse(template.render(context, request))


    else:
        template = loader.get_template('voices/cart.html')
        context = {}
        print(context, file=sys.stderr)
        return HttpResponse(template.render(context, request))
"""

































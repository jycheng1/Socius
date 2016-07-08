#from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from voices.models import *
from voices.forms import * 
from django.shortcuts import render_to_response
from formtools.wizard.views import SessionWizardView
import logging
logr = logging.getLogger(__name__)

def index(request):
    all_prod = Products.objects.all()
    template = loader.get_template('voices/index.html')
    context = {'all_prod': all_prod,}
    return HttpResponse(template.render(context, request))

class ContactWizard(SessionWizardView):
    template_name = "voices/voices_form.html"

    def done(self, form_list, **kwargs):
        form_data = process_form_data(form_list)
        return render_to_response('voices/done.html', {'form_data':form_data}) 

def process_form_data(form_list):
    # add to db
    form_data = [form.cleaned_data for form in form_list]

    logr.debug(form_data[0]['request1'])
    logr.debug(form_data[0]['request2'])
    logr.debug(form_data[0]['request3'])
    logr.debug(form_data[1]['why'])

    elem = Request(request1 = form_data[0]['request1'], 
                   request2 = form_data[0]['request2'], 
                   request3 = form_data[0]['request3'], 
                   why = form_data[1]['why'], )
    elem.save()

    return form_data


































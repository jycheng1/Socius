from django import forms
from voices.models import *

class VoicesForm(forms.Form):
    request1 = forms.CharField(max_length=100)
    request2 = forms.CharField(max_length=100)
    request3 = forms.CharField(max_length=100)

class WhyForm(forms.Form):
    why1 = forms.CharField(max_length=200)
    why2 = forms.CharField(max_length=200)
    why3 = forms.CharField(max_length=200)

# model form 

class RequestForm(forms.ModelForm):
	class Meta:
		model = Request
		exclude = ()

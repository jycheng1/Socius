from django import forms

class VoicesForm(forms.Form):
    request1 = forms.CharField(max_length=100)
    request2 = forms.CharField(max_length=100)
    request3 = forms.CharField(max_length=100)

class WhyForm(forms.Form):
    why = forms.CharField(max_length=200)

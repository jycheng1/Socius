from django.shortcuts import render
from socius.models import *
from socius.forms import * 

# sets up the main view when the user logs in
def global_stream(request):

	return render(request, 'index.html')

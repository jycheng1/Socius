from django.shortcuts import render
from dashboard.models import *
from dashboard.forms import * 

# Used to create and manually log in a user
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import login as redirect_login

# URL/HTTP libraries
from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect
from django.core import serializers
from django.http import JsonResponse
from django.http import HttpResponse, Http404

import json
from django.core.serializers.json import DjangoJSONEncoder

from django.forms.models import model_to_dict



# Main view
# def index(request):

# 	return render(request, 'index.html')


# Dashboard
def dashboard(request):

    orgs = Organization.objects.all() 
    org_data = serializers.serialize('json', orgs)

    # org_products_dic = {}

    # for org in orgs:
    #     # reverse query
    #     products = org.products.all()
    #     org_products_dic[org.id] = products


    # # reverse - Organization.requests.all(), default related_name = request_set

    products = Product.objects.all()
    product_data = serializers.serialize('json', products)

    # product_data = json.dumps(org_products_dic, cls=DjangoJSONEncoder)

    return render(request, 'dashboard.html', {'org_data': org_data, 'product_data': product_data})


# Request
def request(request):
   # get method
    if request.method == 'GET':  
        requests = Request.objects.all()

        return render(request, 'request.html', {'form': RequestForm(), 'requests':requests})

    # post method
    form = RequestForm(request.POST) 

    # validates the form
    if not form.is_valid():
        context = {'form': form}
        return render(request, 'request.html', context)
    # saves the form 
    form.save()

    requests = Request.objects.all()

    return render(request, 'request.html', {'form': RequestForm(), 'requests':requests})


# user's profile
@login_required
def view_profile(request, username):
    user = User.objects.get(username = username)
    userProfile = UserProfile.objects.get(username = username)

    return render(request, 'profile.html', {'userProfile': userProfile})


def product_register(request):
   # get method
    if request.method == 'GET':  
        products = Product.objects.all()

        return render(request, 'product.html', {'form': ProductForm(), 'products':products})

    # post method
    form = ProductForm(request.POST, request.FILES) 

    # validates the form
    if not form.is_valid():
        return render(request, 'product.html', {'form': form})
    # saves the form 
    form.save()

    products = Product.objects.all()

    return render(request, 'product.html', {'form': ProductForm(), 'products':products})




def org_register(request):
   # get method
    if request.method == 'GET':  
        orgs = Organization.objects.all()

        return render(request, 'org.html', {'form': OrganizationForm(), 'orgs':orgs})

    # post method
    form = OrganizationForm(request.POST, request.FILES) 

    # validates the form
    if not form.is_valid():
        return render(request, 'org.html', {'form': form})
    # saves the form 
    form.save()

    orgs = Organization.objects.all()

    return render(request, 'org.html', {'form': OrganizationForm(), 'orgs':orgs})


# Register new user
def register(request):
    # Check request method. pass if it's GET.
    if request.method == 'GET': pass 

    # if POST, extract user info.
    newUserProfileForm = UserProfileForm(request.POST, request.FILES)
    # Check for errors:
    if not newUserProfileForm.is_valid():
        context = {'userProfileForm': newUserProfileForm}
        # Evoke built in login method.
        return redirect_login(request, 
            template_name="welcome.html", extra_context=context)

    # If no errors, construct rest of the user profile and save.
    username = newUserProfileForm.cleaned_data.get('username')
    password = newUserProfileForm.cleaned_data.get('password1')
    # First create an User object. 
    newUser = User.objects.create_user(username=username, password=password)
    newUser.save()
    # Attach the new User instance and save user profile.
    newUserProfile = newUserProfileForm.save(commit=False)
    newUserProfile.user = newUser
    newUserProfile.save()
    # Log the user in manually.
    newUser = authenticate(username=username, password=password)
    login(request,newUser)
    # Redirect to home.
    return redirect(reverse('dashboard'))

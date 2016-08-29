from django.shortcuts import render
from dashboard.models import *
from dashboard.forms import * 
from voices.models import Request, Product, Donation
from voices.forms import RequestForm


# Used to create and manually log in a user
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.views import login as redirect_login

# URL/HTTP libraries
from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.core import serializers
from django.http import JsonResponse
from django.http import HttpResponse, Http404

import json
from django.core.serializers.json import DjangoJSONEncoder

import sys


# Main view
# def index(request):

# 	return render(request, 'index.html')


# Dashboard
def dashboard(request):

    context = {}

    # if user is logged in, send current UserProfile info to template to show link to org page
    # checking the correct user type is done in the template 
    if request.user.is_authenticated():
        userProfile = UserProfile.objects.get(username = request.user.username)
        context['userProfile'] = userProfile

    # all orgs 
    orgs = Organization.objects.all() 
    orgs_json = serializers.serialize('json', orgs)
    context['orgs_json'] = orgs_json

    # all products
    products = Product.objects.all()
    products_json = serializers.serialize('json', products)
    context['products_json'] = products_json

    # dictionary (key - org pk, value - product objects)
    org_products_dic = {}

    for org in orgs:
        # reverse query
        products = org.products.all()
        products_json = serializers.serialize('json', products) # model obj -> json str
        products_list = json.loads(products_json)               # json str -> python list 
        org_products_dic[org.pk] = products_list                # python dic {pk : python list}

    org_product_json = json.dumps(org_products_dic)            # python dic -> json 

    context['org_product_json'] = org_product_json

    return render(request, 'dashboard.html', context)


# check if the current user type is Org User
def org_check(user):
    userProfile = UserProfile.objects.get(username = user.username)

    return userProfile.user_type == "O"



@login_required
@user_passes_test(org_check)
def org_page(request):
    orgs = Organization.objects.all()

    return render(request, 'org.html', {'orgs':orgs})



# **temporary
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

    context = {}

    userProfile = UserProfile.objects.get(username = username)
    context['userProfile'] = userProfile

    if userProfile.user_type == 'O':
        org = userProfile.org
        context['org'] = org
        # org = Organization.objects.get(userProfile = userProfile)

    donations = Donation.objects.filter(donor=userProfile)

    context['donations'] = donations


    return render(request, 'profile.html', context)


@login_required
@user_passes_test(org_check)
def product_register(request):

   # get method
    if request.method == 'GET': 
        # temporary 
        products = Product.objects.all()

        return render(request, 'product.html', {'form': ProductForm(), 'products':products})

    # post method
    form = ProductForm(request.POST, request.FILES) 

    # validates the form
    if not form.is_valid():
        return render(request, 'product.html', {'form': form})
 
    # add organization info to product and save it
    newProduct = form.save(commit=False)

    userProfile = UserProfile.objects.get(username = request.user.username)
    org = Organization.objects.get(userProfile = userProfile)

    newProduct.organization = org 
    newProduct.save()

    # form.save()

    products = Product.objects.all()

    return render(request, 'product.html', {'form': ProductForm(), 'products':products})



# Register new user
def register(request):
    # Check request method. pass if it's GET.
    if request.method == 'GET': pass 

    # if POST, extract user info.
    newUserProfileForm = UserProfileForm(request.POST, request.FILES, prefix='reg')
    print(newUserProfileForm)
    # Check for errors
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



# Register new org user
def org_user_register(request):
    # Check request method. pass if it's GET.
    if request.method == 'GET': pass 

    # if POST, extract user and org info.
    newUserProfileForm = UserProfileForm(request.POST, request.FILES, prefix='reg')
    newOrgForm = OrganizationForm(request.POST, request.FILES, prefix='org') 

    # Check for errors
    if not newUserProfileForm.is_valid() or not newOrgForm.is_valid():
        context = {'userProfileForm': newUserProfileForm, 'orgForm':newOrgForm}
        # Evoke built in login method.
        return redirect_login(request, 
            template_name="org-login.html", extra_context=context)

    # If no errors, construct rest of the user profile and save.
    username = newUserProfileForm.cleaned_data.get('username')
    password = newUserProfileForm.cleaned_data.get('password1')
    # First create an User object. 
    newUser = User.objects.create_user(username=username, password=password)
    newUser.save()
    # Attach the new User instance and save user profile.
    newUserProfile = newUserProfileForm.save(commit=False)

    # set the user type to org user
    newUserProfile.user_type = 'O'
    newUserProfile.user = newUser
    newUserProfile.save()

    # save the org
    newOrg = newOrgForm.save(commit=False)
    newOrg.userProfile = newUserProfile
    newOrg.save()

    # Log the user in manually.
    newUser = authenticate(username=username, password=password)
    login(request,newUser)
    # Redirect to home.
    return redirect(reverse('dashboard'))

# Donate page
@login_required
def donate(request):
    if request.method == 'POST':
        itemName = request.POST.get('itemName')
        orgRecipient = request.POST.get('orgRecipient')
        context = {'itemName': itemName,
                   'orgRecipient': orgRecipient,
                  }
        # print(itemName, file=sys.stderr)
        return render(request, 'donate.html', context)
    else:
        context = {}
        return render(request, 'donate.html', context)

# save donation to model
def saveDon(request):
    if request.method == 'POST':
        orderNum = request.POST.get('order_number')
        donationName = request.POST.get('itemName')
        orgRecipient = request.POST.get('orgRecipient')
        org = Organization.objects.get(name = orgRecipient)
        donObj = Product.objects.get(organization = org, name=donationName)
        quantity = donObj.quantity
        donor = UserProfile.objects.get(username = request.user.username)

        currDonation = Donation()
        currDonation.donationName = donationName
        currDonation.organization = org
        currDonation.orderNum = orderNum
        currDonation.quantity = quantity
        currDonation.donor = donor
        currDonation.save()

        setattr(donObj, 'quantity', 0)
        donObj.numDonated = donObj.numDonated + 1
        donObj.save()

        context = {}

        return redirect(reverse('dashboard'))
    else:
        context = {}
        return redirect(reverse('dashboard'))
        
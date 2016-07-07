from django.shortcuts import render
from socius.models import *
from socius.forms import * 

# Used to create and manually log in a user
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import login as redirect_login

# URL/HTTP libraries
from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect



# Main view
def index(request):

	return render(request, 'index.html')



# Dashboard
def dashboard(request):
    requests = Request.objects.all()

    return render(request, 'dashboard.html', {'requests':requests})


# Request
def request(request):
   # get method
    if request.method == 'GET':  
        return render(request, 'request.html', {'form': RequestForm()})

    # post method
    form = RequestForm(request.POST) 

    # validates the form
    if not form.is_valid():
        context = {'form': form}
        return render(request, 'request.html', context)
    # saves the form 
    form.save()

    return render(request, 'dashboard.html')


# user's profile
@login_required
def view_profile(request, username):
    user = User.objects.get(username = username)
    userProfile = UserProfile.objects.get(username = username)

    return render(request, 'profile.html', {'userProfile': userProfile})




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

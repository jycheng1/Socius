from django.conf.urls import include, url, patterns
from django.contrib.auth.views import login, logout_then_login

# from django.contrib.auth import views as auth_views
from socius import views
from socius import forms

urlpatterns = [
	url(r'^$', views.dashboard, name = 'dashboard'),
    url(r'^dashboard$', views.dashboard, name = 'dashboard'),
    url(r'^profile/(?P<username>\w+)$', views.view_profile, name = 'profile'),
    url(r'^request$', views.request, name = 'request'),

	url(r'^login$', login, {'template_name': "welcome.html", 
        'extra_context':{'userProfileForm':forms.UserProfileForm}}, 
        name='login'),
    url(r'^logout$', logout_then_login, name='logout'),
    url(r'^register$', views.register, name='register'),

]
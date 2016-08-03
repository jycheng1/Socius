from django.conf.urls import include, url, patterns
from django.contrib.auth.views import login, logout_then_login, logout
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.forms import AuthenticationForm


# from django.contrib.auth import views as auth_views
from dashboard.models import *
from dashboard import views
from dashboard import forms


urlpatterns = [
	# url(r'^admin/', admin.site.urls),
	url(r'^$', views.dashboard, name = 'dashboard'),
    # url(r'^dashboard$', views.dashboard, name = 'dashboard'),
    url(r'^profile/(?P<username>\w+)$', views.view_profile, name = 'profile'),
    url(r'^request$', views.request, name = 'request'),
    url(r'^product_register$', views.product_register, name = 'product_register'),
    
    # url(r'^org-profile/(?P<username>\w+)$', views.view_org_profile, name = 'org-profile'),

    url(r'^org_page$', views.org_page, name = 'org_page'),


    url(r'^login$', login, {'template_name': "welcome.html", 
        'extra_context':{'userProfileForm':forms.UserProfileForm}}, 
        name='login'),
    url(r'^logout$', logout_then_login, name='logout'),


    url(r'^org-login$', login, {'template_name': "org-login.html", 
        'extra_context':{'userProfileForm':forms.UserProfileForm, 'orgForm':forms.OrganizationForm}}, 
        name='org-login'),
    
    url(r'^register$', views.register, name='register'),
    url(r'^org_user_register$', views.org_user_register, name='org_user_register'),
    # url(r'^org-register$', views.organization_register, name='org-register'),

] 

if settings.DEBUG is True: 
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.conf.urls import url
from . import views
from dashboard import views as dashboard_views

app_name = 'review'

urlpatterns = [
# /review/
    url(r'^$', views.index, name='review'),  
    url(r'^index/$', views.index, name='index'),
    url(r'^requestTable/$', views.requestTable, name='requestTable'),  
    url(r'^donationTable/$', views.donationTable, name='donationTable'), 
    url(r'^dash/$', dashboard_views.dashboard, name='dash')

]
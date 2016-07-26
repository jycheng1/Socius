from django.conf.urls import url
from . import views

app_name = 'requestlist'

urlpatterns = [
# /requestlist/
    url(r'^$', views.index, name='requestlist'),  
]
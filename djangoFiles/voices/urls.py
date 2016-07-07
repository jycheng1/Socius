from django.conf.urls import url
from . import views

urlpatterns = [
# /voices/
    url(r'^$', views.index, name='index'),

# /favorite/
   # url(r'^/addCart/$', views.addCart, name='addCart'),
]
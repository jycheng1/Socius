from django.conf.urls import url
from . import views

app_name = 'voices'

urlpatterns = [
# /voices/
    url(r'^$', views.index, name='index'),  
    # url(r'^changeList/(?P<product_id>[0-9]+)/$', views.changeList, name='changeList'),
    url(r'^cart/$', views.cart, name="cart"),
    url(r'^thanks/$', views.thanks, name="thanks"),
    
# /favorite/
   # url(r'^/addCart/$', views.addCart, name='addCart'),
]
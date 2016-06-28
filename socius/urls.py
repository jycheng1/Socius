from django.conf.urls import include, url
# from django.contrib.auth import views as auth_views
from socius import views

urlpattern = [
	url(r'^$', views.global_stream, name = 'global_stream')
]
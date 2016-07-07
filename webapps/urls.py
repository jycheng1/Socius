from django.conf.urls import include, url
# from django.contrib import admin
from socius import views 

urlpatterns = [
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.dashboard),
    url(r'^socius/', include('socius.urls')),

]

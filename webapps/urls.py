from django.conf.urls import url, include
from django.contrib import admin
from dashboard import views
from voices import views 

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^socius/dashboard/', include('dashboard.urls')),
    url(r'^socius/voices/', include('voices.urls')),
]

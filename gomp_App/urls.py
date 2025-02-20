from django.urls import path
from . import views
from .views import download_media_file

app_name = 'gomp_App'



urlpatterns = [
    path('', views.main, name='index'),
    path('media/download/<path:file_name>/', download_media_file, name='download_media_file'),

]


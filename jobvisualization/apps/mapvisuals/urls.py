from django.conf.urls import include, url
from apps.mapvisuals import views
#brings to mapvisuals views and directs to index method
urlpatterns = [
	url(r"^$", views.index, name='index'),
]
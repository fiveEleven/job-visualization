from django.shortcuts import render
from apps.data_storage.models import WriteOnly
# Create your views here.

#takes request and grabs all data from database
def index(request):
	content = {
		'info': WriteOnly.objects.all(),
	}
	#passes db data to template
	return render(request, 'mapvisuals/index.html', content)
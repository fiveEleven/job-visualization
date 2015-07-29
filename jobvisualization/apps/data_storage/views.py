from datetime import datetime
from apps.data_storage import job_query as City
from apps.data_storage.models import WriteOnly


WriteOnly.objects.all().delete()

def updateBase():
	print "updateBase"
	WriteOnly.objects.all().delete()
	results = City.job_query("Front End")
	for result in results:
		WriteOnly.objects.create(
			num_jobs = result['numJobs'],
			city_name = result['name'],
			stateName = result['stateName'],
			stateAbbreviation = result['stateAbbreviation'],
			latitude = result['latitude'],
			longitude = result['longitude'],
			job_title = "Front End",
			created_at = datetime.now()
		)

	print "Added Front end results"

	results = City.job_query("Back End")
	for result in results:
		WriteOnly.objects.create(
			num_jobs = result['numJobs'],
			city_name = result['name'],
			stateName = result['stateName'],
			stateAbbreviation = result['stateAbbreviation'],
			latitude = result['latitude'],
			longitude = result['longitude'],
			job_title = "Back End",
			created_at = datetime.now()
		)
	print "Added Backend results"

	results = City.job_query("Full Stack")
	for result in results:
		WriteOnly.objects.create(
			num_jobs = result['numJobs'],
			city_name = result['name'],
			stateName = result['stateName'],
			stateAbbreviation = result['stateAbbreviation'],
			latitude = result['latitude'],
			longitude = result['longitude'],
			job_title = "Full Stack",
			created_at = datetime.now()
		)
	print "added fullstack"
	return True

updateBase()



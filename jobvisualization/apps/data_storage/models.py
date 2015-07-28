from django.db import models

class ReadOnly(models.Model):
	num_jobs = models.IntegerField()
	city_name = models.TextField()
	stateName = models.TextField()
	stateAbbreviation = models.TextField()
	latitude = models.FloatField()
	longitude = models.FloatField()
	job_title = models.TextField()
	created_at = models.DateField()
	class Meta:
		db_table = 'ReadOnly'

class WriteOnly(models.Model):
	num_jobs = models.IntegerField()
	city_name = models.TextField()
	stateName = models.TextField()
	stateAbbreviation = models.TextField()
	latitude = models.FloatField()
	longitude = models.FloatField()
	job_title = models.TextField()
	created_at = models.DateField()
	class Meta:
		db_table = 'WriteOnly'

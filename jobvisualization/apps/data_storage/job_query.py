"""
Glassdoor API retriever
Created by Max, Keith, Steve

This is a function that outputs numbers of jobs position by city base on job title and it's related search

Usage:
1) in terminal: 
	pip install requests
2) Add these lines in your file:
	import job_query as City
	cities = City.job_query("job_title")
	for city in cities:
		print "id:",city['id']
		print "name",city['name']
		print "State Name:",city['stateName']
		print "Number of jobs:",city['numJobs']
		print "Longitude:",city['longitude']
		print "Latitude:",city['latitude']
		print "---------------------"
"""

from urllib2 import Request, urlopen, URLError
import json
import requests
from collections import OrderedDict

def job_query(job_title):
	params_gd = OrderedDict({
	    "v": "1",
	    "format": "json",
	    "t.p": "39545",
	    "t.k": "duKPqWBTqAM",
	    "action": "jobs-stats",
	    "jt": job_title,
	    "returnCities": True,
	    "returnJobTitles": True,
	    "userip": json.loads(urlopen("http://ip.jsontest.com/").read().decode('utf-8'))['ip'],
	    "useragent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36"
	})

	# construct the URL from parameters
	basepath_gd = 'http://api.glassdoor.com/api/api.htm'

	# request the API
	response_gd = requests.get(basepath_gd,
	                           params=params_gd,
	                           headers={
	                               "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36"
	                           })
	
	return response_gd.json()['response']['cities']
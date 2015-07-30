"use strict";
app

.factory('taskFactory', function(){
	var tasks = [
		{task: 'Eat Lunch', priority: 'HIGH', deadline: new Date(), createdAt: new Date()},
		{task: 'Eat Pray', priority: 'HIGH', deadline: new Date(), createdAt: new Date()},
		{task: 'Eat Pray Love', priority: 'HIGH', deadline: new Date(), createdAt: new Date()},
		{task: 'Eat Pray Lunch', priority: 'HIGH', deadline: new Date(), createdAt: new Date()},
	];

	var factory = {};

	factory.getTasks = function(callback){
		callback(tasks);
	};

	return factory;
});

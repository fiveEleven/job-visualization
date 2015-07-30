app

.directive('colors', function(){
	return {
        restrict: "AE",
		link: function(scope, element, attrs){
			element.css("background-color", "yellow")

			element.bind('mouseenter', function(){
				element.css("background-color", "red")
			})
			element.bind('mouseleave', function(){
				element.css("background-color", "green")
			})
		}
	}
})


.directive('sampleLink', function() {
    return {
        restrict: "E",
        template: "<div>...loaded template (div) through <strong> sample-link </strong> directive!...</div>", // OR
        // templateUrl: path/to/file/template.html
        link: function(scope, element, attrs){
        	console.log("<sample-link> link executing")

       		element.addClass("sampleLinkLinked")

           	element.bind("mouseenter", function(){

           		// Do things after mouseenter...
        		console.log("<sample-link> mouseenter triggered.")

           		// Add a class...
           		element.addClass("mouseenterEntered")
 				// addClass()
				// after()
				// append()
				// detach()
				// empty()
				// eq()
				// hasClass()
				// html()
				// prepend()
				// prop()
				// text()
				// toggleClass()
				// val()

           });

        }
    };
})















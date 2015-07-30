app.controller('MapController', ['$scope', 'leafletData',

    function($scope, leafletData) {
    	
    	// Start the map zoomed in on the center of the country 
        //and add custom event listenters for our leaflet directive
    	angular.extend($scope, {
			center: {
				lat: 39.8282,
				lng: -98.5795,
				zoom: 5,
			},
			events: {
	            map: {
	                enable: ['zoomstart', 'zoomend'],
	                logic: 'emit'
	            }
        	}
		});
      
  		/*********************************************************
						   MAP INITIALIZATIONS
  		*********************************************************/
  		// Grabs our map objects as a promise and then adds a click handler and runs our 
        // d3Map function which generates our d3 overlay.
        d3.json("/statedata", function(collection) { 
            d3.json("/mapdata", function(col){
                leafletData.getMap().then(function(map) {
                	// var popup = L.popup();
                	
                	function onMapClick(e) {
                	    popup.setLatLng(e.latlng)
                	       	.setContent("You clicked the map at " + e.latlng.toString())
                	       	.openOn(map);
                	}
                
                	// L.marker([47.6097, -122.3331])
                	// 	.addTo(map)
                	// 	.bindPopup("<b>Front End Developer</b><br>$85,000/year.")
                	// 	.openPopup();
                	
                	map.on('click', onMapClick);
                	d3Map(map);
                });


                /*********************************************************
        							MAP EVENT HANDLERS
                *********************************************************/
                // This uses the custom event handlers that we registered at the top
                //of the document to clear out the old svg and redraw it when the map
                //is zoomed in or out.
                
                $scope.$on('leafletDirectiveMap.zoomstart', function(event){
        	    	d3.selectAll('svg').remove();
        	    	$scope.$on('leafletDirectiveMap.zoomend', function(event){
        		    	leafletData.getMap().then(function(map){
        		    		map.getPanes().overlayPane.innerHTML = "";
        		    		d3Map(map);
        		    	});
        	    	});
        	    });

            
            /*********************************************************
                                    D3 STUFFS
            *********************************************************/
                // MAP DRAWING FUNCTION
            	function d3Map(map){
                	
                 //-------------------D3 INITIALIZATION--------------------//
                    
                     // Main SVG which sits in the leaflet overlay pane
                     var svg = d3.select(map.getPanes().overlayPane).append("svg");
            		
                     // This is the group which will contain all of our svg elements for our map overlay
                    var g = svg.append("g").attr("class", "leaflet-zoom-hide");
                    var transform = d3.geo.transform({point: projectPoint});
                    var path = d3.geo.path().projection(transform);
                    
                     // This is the functionality that allows our dots to be correctly projected onto the map
                     //The function in our point radius method will use what we pass in below in our radius key in our
                     //datum method to our projection to draw the dots.
                    var g2 = svg.append("g").attr("class", "leaflet-zoom-hide");
                    var feature2 = g2.selectAll("path.point");
                    var transform2 = d3.geo.transform({point: projectPoint});
                    var path2 = d3.geo.path().projection(transform2).pointRadius(function(d){ 
                        var zoom = map.getZoom();
                        if( zoom < 7){
                            return Math.min(((d.radius + zoom) *  0.09), 36);
                        } else if(zoom >= 7 && zoom < 10){
                            return Math.max(((d.radius + zoom) *  0.038), 5);
                        } else{
                            return Math.max(((d.radius + zoom) *  0.028), 5);
                        }
                    });

                    function projectPoint(x, y) {
                        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
                        this.stream.point(point.x, point.y);
                    }    
                 //^^^^^^^^^^^^^^^^^^^^^^^END INITIALIZATION^^^^^^^^^^^^^^^^^^^^^^^^^//

                 
                 //----------------APPEND NEW SVG ELEMENTS TO DOM-------------------//   
                     // This runs through our geo-JSON file containing the data for the state overlays
                    console.log(collection);
        	      	var feature = g.selectAll("path")
        	          	.data(collection.features)
        	        	.enter()
        	        	.append("path")
                        .attr("fill-opacity", 1)
                        .attr("fill", "black")
                        .attr("stroke", "#fff");

    	      	
                        // This sets up our color and range to map the various color to different points based
                        //on job availability per point
                        var colors = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
                                       "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", 
                                       "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];

                        var heatmapColor = d3.scale.linear()
                          .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
                          .range(colors);

                        var range = [];
                        for(var i=0; i<col.features.length; i++){
                            range.push(col.features[i].properties.numJobs);
                        }
                        var c = d3.scale.linear().domain(d3.extent(range)).range([0,1]);
                        
                        // Where our job data is actually put into SVG form and appended to the DOM
    	      			feature2.data(col.features)
    	      				.enter()
    	      				.append("path")
                            .style("fill", function(d) {
                                return heatmapColor(c(d.properties.numJobs));
                            })
                            .datum(function(d){
                                return {type: "Point", coordinates: [d.geometry.coordinates[1], d.geometry.coordinates[0]], radius: d.properties.numJobs};
                            })
                            .attr("class", "point")
                            .attr("d", path2);
    	      		
             //^^^^^^^^^^^^^^^^^^^^^^^END DATA/APPEND^^^^^^^^^^^^^^^^^^^^^^^//
                    


             //-------------------CLEAN UP-------------------//
                     //Reposition our SVG's on zoom in/out
                    map.on("viewreset", reset);
                    reset();
       	
                    function reset() {
                        var bounds = path.bounds(collection),
                            topLeft = bounds[0],
                            bottomRight = bounds[1];

                        svg.attr("width", bottomRight[0] - topLeft[0])
                            .attr("height", bottomRight[1] - topLeft[1])
                            .style("left", topLeft[0] + "px")
                            .style("top", topLeft[1] + "px");

                        g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
                        g2.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
                        feature.attr("d", path);
                        feature2.attr("d", path2);
                    
                    } //End reset
                } //End D3Map
            }); // End D3.json for mapdata
        }); // End D3.json for statedata
    } // End main controller function
]); // End controller wrapper




















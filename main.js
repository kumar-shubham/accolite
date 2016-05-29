
				//Angular JS code for handling data from JSON
					var data3;
					console.log("hello");
					var app = angular.module('myApp', []);
					console.log("hello1");
					app.controller('MainCtrl', function($scope, $http) {
						var url = "https://hackerearth.0x10.info/api/accolite_product?type=json&query=list_product";
						var result = $http.get(url);
						result.success( function(response) {
				      	$scope.menu = response.menu;
				      	data3 = response.menu;
				      	$scope.predicate = 'name';
		  				$scope.reverse = false;
		  				$scope.order = function(predicate) {
		   			    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		    			$scope.predicate = predicate;
		  				};

		  				//code for updating likes
		  				$scope.updateLikes = function(name, product, num){
							var newVal = localStorage.getItem(name);
							if(newVal == null){
								newVal = 0;
							}
							console.log("Likes for " + name + " :: before : " + newVal + " value:: " + num);
							localStorage.setItem(name, +newVal+parseInt(num));
							console.log("Likes for " + name + " :: after :" + localStorage.getItem(name));
							$scope.menu[$scope.menu.indexOf(product)].likes = parseFloat(localStorage.getItem(name));
						};

						//code to get total likes
						$scope.getTotalLikes = function(){
							var total = 0;
							for(var i = 0; i < $scope.menu.length; i++){
	        				var product = $scope.menu[i];
	        				total += product.likes;
    						}
    					return total;
						}

						//code to populate like for the first time
						for(key in $scope.menu){
							console.log("test in for:::");
      						var val;
      						if ($scope.menu.hasOwnProperty(key)) {
      							console.log("test111");
      							val = localStorage.getItem($scope.menu[key].name)
      							console.log("setting likes::: " + val)
      							if(val == null){
      							$scope.menu[key].likes = 0;
      							}
      							else{
      								$scope.menu[key].likes = parseFloat(val);
      							}
      						}
						}


				   });
						// for displaying api hits
						var url1 = "https://hackerearth.0x10.info/api/accolite_product?type=json&query=api_hits";
						var result1 = $http.get(url1);
						result1.success( function(response1) {
				      	$scope.api_hits = response1;
				   });
				   });


				// code to change to icon while toggling the collapsible div headers
				function changeIcon(){
					var x = document.getElementsByClassName("collapsible-header");
					var i;
					for (i = 0; i < x.length; i++) {
					    x[i].getElementsByTagName("i")[0].className = "mdi-navigation-chevron-right";
					}

					var y = document.getElementsByClassName("collapsible-header active");
					var i;
					for (i = 0; i < y.length; i++) {
					    y[i].getElementsByTagName("i")[0].className = "mdi-navigation-expand-more";
					}
					console.log("changed");
					
				}

				//code to populate stars
				$.fn.stars = function() {
			    return $(this).each(function() {
			        // Get the value
			        var val = parseFloat($(this).attr('value'));
			        // Make sure that the value is in 0 - 5 range, multiply to get width
			        var size = Math.max(0, (Math.min(5, val))) * 16;
			        // Create stars holder
			        var $span = $('<span />').width(size);
			        // Replace the numerical value with stars
			        $(this).html($span);
			    });
			}

			//code for formatting link string
			$.fn.format = function() {
			    return $(this).each(function() {
			        // Get the value
			        var val = $(this).attr('href');
			        // Substring the link
			        var newVal = val.substring(val.lastIndexOf('/')+1);
			        // // Create holder
			        var $a = $('<a />').text(newVal);
			        // Replace the numerical value with stars
			        $(this).html($a);
			    });
			}

			// setting rating stars
			function setRating(){

				$('span.stars').stars();
			}
			
			//Formating the string for link
			function setFormat(){
				$('a.link').format();
				$('.like').on("click",function(e){e.stopPropagation()})
			}

			setTimeout(setRating, 1000);
			setTimeout(setFormat, 1000);

			//to stop click from propogating to parent
			$('.like').on("click",function(e){e.stopPropagation()});
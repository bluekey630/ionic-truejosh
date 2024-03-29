/**
 * 
 */
var base_stars;
var star_base_class = "star";

function initVoting(parentClassName, starClassName, diagramId, stars, active) {

	base_stars = stars;

	if (parentClassName && starClassName && diagramId) {
		star_base_class = starClassName;
		
		$("." + parentClassName + " ." + starClassName)
		.mousemove(function(event) {
			$(this).prevAll(".star-wrap-div").each(function() {
				if (!$(this).hasClass("over-on")) {
					$(this).addClass("over-on");
				}
			});

			$(this).nextAll(".star-wrap-div").addClass("over-off");

			if (!$(this).hasClass("over-on")) {
				$(this).addClass("over-on");
			}
		}).mouseover(function() {
			$(this).mousemove();
		}).mouseout(function() {
			$(this).prevAll(".star-wrap-div").removeClass("over-on");
			$(this).removeClass("over-on");
			$(this).nextAll(".star-wrap-div").addClass("over-off");
			$(this).removeClass("over-off");
		}).click(
				function() {
					
					if ( active ) {
						var value = $(this).find('span').text();
	
						if (value) {
							$.get("/voting/vote/d/" + diagramId + "/" + value
									+ "/j", function(data) {
								
							var parse_value = eval( '(' + data + ')' );
								
								if (parse_value.status ){
									
									if ( parse_value.status == "success") {
										
										updateVotes(diagramId, parse_value.data, parse_value.count );
									} else {
										if (parse_value.status == "guest") {
											displayLoginWidjets();
										} else {
											alert("eval : " + parse_value.data);
										}
									}
								} else {
									alert("Undefined response : " + data );
								}
								
							});
						}
					} else {
						displayLoginWidjets();
					}
				});

		$("." + parentClassName).mouseout(function() {
			$("." + parentClassName + " ." + starClassName).each(function() {
				$(this).removeClass("over-off");
			});
		});
	}
}

function updateVotes(diagramId, votes, count ) {

	if ( base_stars && votes && diagramId ) {
		var number_of_votes = parseInt(votes);
		
		if (!isNaN(number_of_votes)) {
			var break_loop = false;
			var starObj;
			
			for (var index = base_stars; index > 0; index--) {
				
				starObj = $("." + star_base_class + "-" + diagramId + "-" + index ).find('span');
				
				if (starObj.length > 0) {
					
					if (number_of_votes < index ) {
						starObj.removeClass("on");
						starObj.addClass ("off");
					} else {
						starObj.removeClass("off");
						starObj.addClass ("on");
					}
				} else {
					alert ( index + " : " + base_stars );
					break;
				}
			}
			
			$("#star-text-"+diagramId).text("("+count+")");
		} else {
			alert ("Number error");
		}
	}
}

/*function initStaticVote(parentClassName, starClassName) {
	
	if (parentClassName && starClassName) {
		star_base_class = starClassName;
		
		$("." + parentClassName + " ." + starClassName).click( function (){
			displayLoginWidjets();
		});
	}
} */
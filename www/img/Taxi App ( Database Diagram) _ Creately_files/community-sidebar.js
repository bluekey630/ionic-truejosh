/**
 * 
 */

var org;
var sorted;

$(document).ready( function() {
	
	var li_length = $("#id_category_list li").length;
	
	if (li_length > 1 ) {
		org = [];
		sorted = [];
		var eliment;
		
		$("#id_category_list li:not(:first-child)").each(function(index) {
			eliment = {};
			eliment.text = $(this).text();
			eliment.value = $(this).html();
			
			//org[index]= eliment;
			org.push(eliment);
			sorted.push(eliment);
		});
	}
	
	if (sorted.length>0) {
		sorted = sorted.sort (function(a, b){
			var nameA=a.text.toLowerCase(), nameB=b.text.toLowerCase();
			 if (nameA < nameB) //sort string ascending
			  return -1;
			 if (nameA > nameB)
			  return 1;
			 return 0;//default return value (no sorting)
		});

	}
	
	// Show hide section on the community page and example pages
	$("#id-category-section-collapse").click(function() {
		var li_text;
		
		if ($(this).hasClass("section-plus")){
			
			if (sorted.length > 0 ) {
				$("#id_category_list li:not(:first-child)").each(function(index) {
					li_text = sorted[index];
					$(this).text(li_text.text);
					$(this).html(li_text.value);
				});
			}
			
			$(this).removeClass("section-plus");
			$(this).text("Less..");
			$(this).addClass("section-minus");
			$(".category-more-section").removeClass("section-hide");
		} else {
			
			if ( org.length > 0  ) {
				
				$("#id_category_list li:not(:first-child)").each(function(index) {
					li_text = org[index];
					$(this).text(li_text.text);
					$(this).html(li_text.value);
				});
			}
			
			$(this).removeClass("section-minus");
			$(this).addClass("section-plus");
			$(this).text("More..");
			$(".category-more-section").addClass ("section-hide");
		}
	});

});


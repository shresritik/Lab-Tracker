

$(document).ready(function(){

	// mob device
	
    $(".search-arrow .fa-angle-double-down").click(function(){
      $('.top_header').slideToggle();
      $(".fa-angle-double-down").toggleClass("rotate");
       
    });

    // quick links 
    
     $(".links-heading").click(function(){
      $('.links-section').animate({
       width: 'toggle'
       });
      });

   });
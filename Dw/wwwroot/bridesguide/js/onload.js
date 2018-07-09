/*
 *  CONFIGURATION
*/

WIDTH_BOOK=1100;  		 	 //WIDTH BOOK
HEIGHT_BOOK=715;  		     //HEIGHT BOOK
ZOOM_STEPS_SIZE = 0.1;   	 //STEPS SIZE FOR ZOOM
ZOOM_STEPS_LENGTH=3;         //STEPS LENGTH FOR ZOOM


/*
 *  Variables
*/
var toolsHeight=60;
var autoMarginB=5;   //margin bottom
var autoMarginT=5; //margin top
var autoMarginL=100;  //margin left
var autoMarginR=100;  //margin right



/////document READY
$( window ).on( "pageinit",function( event ) {
	resize_input_text()

});

function resize_input_text(){
	var input=$('#page-number');
	var btn=$('nav#right button');
	input.css('width',30);
	input.css('padding-right',btn.width()+2);
}

function bookHeightCheck() {
	if ( $('#book').height() > $(window).height()-(toolsHeight+autoMarginB+autoMarginT) ) {
		higherThanWindow = true;
	} else {
		higherThanWindow = false;
	}
	return higherThanWindow;
}

function calculate_zoom_factor(arg) {
	
	if (arg == true) {	// default
		zoom_factor = $('#page').height() * ZOOM_STEPS_SIZE;
	} else {
		zoom_factor = default_book_height * ZOOM_STEPS_SIZE;
	}	
	
}

function clear_on_focus() {
	function getStartInputValues() {
		$('input[type="text"], input[type="password"], textarea').each( function() {
			var startValue = $(this).val();
			$.data(this, "startValue", startValue);	
		})
	}
	getStartInputValues();
	$('input[type="text"], input[type="password"], textarea').focus(function() {
		startValue = $.data(this, "startValue");		
		if ( this.value == startValue ) {
			this.value = '';
		}
	});
	$('input[type="text"], input[type="password"], textarea').blur(function() {
		if ( this.value == '' ) {
			this.value = startValue;
		}
	})
}


function close_overlay() {
	$('.overlay').removeClass('active');
}


function isiPhone(){
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)
    );
}


function contact_form() {

	$('#contact .req').each(function() {
		startValue = $(this).val();
		$.data(this, "startValue", startValue);
	});

	$('#contact button[type="submit"]').click(function() {

		$('#contact .req').removeClass('error');
		$('#contact button').fadeOut('fast');

		var isError = 0;

		// Get the data from the form
		var name	= $('#contact #name').val();
		var email	= $('#contact #email').val();
		var message	= $('#contact #message').val();

		// Validate the data
		$('#contact .req').each(function() {
			startValue = jQuery.data(this, "startValue");
			if ( ($(this).val() == '') || (this.value == startValue) ) {
				$(this).addClass('error');
				isError = 1;
			}
		});

		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (reg.test(email)==false) {
			$('#contact #email').addClass('error');
			isError=1;
		}

		// Terminate the script if an error is found
		if (isError == 1) {
			$('#contact button').fadeIn('fast');
			return false;
		}

		$.ajaxSetup ({
			cache: false
		});

		var dataString = 'name='+ name + '&email=' + email + '&message=' + message;  
		
		$.ajax({
			type: "POST",
			url: "php/submit-form-ajax.php",
			data: dataString,
			success: function(msg) {
				
				// Check to see if the mail was successfully sent
				if (msg == 'Mail sent') {
					$("#contact fieldset").hide();
					$("#contact fieldset.thanks").show();
					
					setTimeout(function() {
						close_overlay();
					}, 5000);
					
				} else {
					$('#contact button').fadeIn('fast');
					alert('The problem with sending it, please try again!');
				}
			},

			error: function(ob,errStr) {
				alert('The problem with sending it, please try again.');
			}
		});
		return false;
	});

	$('#contact .close').click(function() {
		close_overlay();
	})
}



var Book = {

	arrows: function() {
		$('.nav_arrow.prev').click(function() {
			$('#book').turn('previous');
		});
		$('.nav_arrow.next').click(function() {
			$('#book').turn('next');
		});
	},

	all_pages: function() {

		var summary = 0;
		var self = this;
		var slider_width = $('#slider').width();
		
		$('#slider').append('<li></li>');
		
		$('#slider li').each(function() {
			li_width = $(this).outerWidth();
			summary += li_width;
		})
	
		$('#slider').css('width', summary);
	
		$("#menu_holder").mousemove(function(e) {
	
			if ( $(this).width() < $("#slider").width() ) {
	
				var distance = e.pageX - $(this).offset().left;
				var percentage = distance / $(this).width();
				var targetX = -Math.round(($("#slider").width() - $(this).width()) * percentage);
				
				$('#slider').animate({left: [targetX+"px", "easeOutCirc"]}, { queue:false, duration: 200 });
			}
		});
		
		$('#all_pages').bind("swipeleft", function() {
			offset = -$("#slider", this).offset().left;
			if (offset < summary-slider_width) {
				$('#slider').animate({ left: "-=320px"}, { queue:false, duration: 200 });
			}
		});
		
		$('#all_pages').bind("swiperight", function() {
			offset = -($("#slider", this).offset().left);
			if (offset > 0) {
				$('#slider').animate({ left: "+=320px" }, { queue:false, duration: 200 });
			}
		});
		
		

		$('#slider li').click(function() {
		
			page_index = $(this).attr('class').substring(4);
			tmp = parseInt(page_index);

			close_overlay();
             $(this).setPage(tmp);
			//$('#book').turn('page', tmp);

		})

		$(document).click(function(e) {
			var target = $(e.target);
			if ( target.hasClass('overlay') ) close_overlay();
		});
	
	},

	book_grab: function() {
		if ($.browser.webkit) {
			$('#page').css('cursor', '-webkit-grab'); 
		}
		if ($.browser.mozilla) {
			$('#page').css('cursor', '-moz-grab');
		}
		if ($.browser.msie) {
			$('#page').css('cursor', 'url(../img/openhand.cur)');
		}
	},

	book_grabbing: function() {
		if ($.browser.webkit) {
			$('#page').css('cursor', '-webkit-grabbing');
		}
		if ($.browser.mozilla) {
			$('#page').css('cursor', '-moz-grabbing');
		}
		if ($.browser.msie) {
			$('#page').css('cursor', 'url(../img/closedhand.cur)');
		}
	},

	book_position: function() {
		book_height	= $('#page').height();
		book_width	= $('#page').width();
		
		half_height	= (book_height/2)+30;
		half_width	= book_width/2;
		$('#page').css({ left: '50%', top: '50%', margin: '-'+half_height+'px auto 0 -'+half_width+'px' });
	},

	drag: function(e) {
		
		$el = $(this);
		$dragged = $el.addClass('draggable');

		$('#page').unbind('mousemove', Book.book_grab);
		$('#page').bind('mousemove', Book.book_grabbing);

        d_h = $dragged.outerHeight(),
        d_w = $dragged.outerWidth(),
        pos_y = $dragged.offset().top + d_h - e.pageY,
        pos_x = $dragged.offset().left + d_w - e.pageX;
        
        $dragged.parents().on("mousemove", function(e) {
            $('.draggable').offset({
                top:e.pageY + pos_y - d_h,
                left:e.pageX + pos_x - d_w
            });
        });
        e.preventDefault();
	},
	
	drop: function() {
		Book.book_grab();
		$('#page').bind('mousemove', Book.book_grab);
		$('#page').removeClass('draggable');
	},

	dragdrop_init: function() {
		bookHeightCheck();

		if ( higherThanWindow == false ) {
			$('#page').unbind('mousedown', Book.drag);
			$('#page').unbind('mouseup', Book.drop);
			$('#page').unbind('mousemove', Book.book_grab);
			$('#page').unbind('mousemove', Book.book_grabbing);
			$('#page').css('cursor', 'default');
		} else {
			$('#page').bind('mousedown', Book.drag);
			$('#page').bind('mouseup', Book.drop);
			$('#page').bind('mousemove', Book.book_grab);
		}
		update_fonts();
	},

	init: function() {
		
		       
		default_book_width	= WIDTH_BOOK;
		default_book_height	= HEIGHT_BOOK;
		default_page_width	= WIDTH_BOOK;
		default_page_height	= HEIGHT_BOOK;
		window_height		= $(window).height();
		window_width		= $(window).width();
		zoom_steps			= ZOOM_STEPS_LENGTH;
		current_zoom_step	= 0;
		dbl_clicked = false;
		on_start = true;
		self = this;
		
	
	 	/* =  jQuery Addresss INIT
		--------------------------*/
		var current_address=$.address.pathNames();
	 	var results=$('#address ul li[data-address='+current_address+']');
	 	var index=results.index('li');
	 	var nrPage =  index+1;
 		if(!nrPage){
			nrPage=1;	
		}

		/* =  jQuery Addresss CHANGE
		--------------------------*/ 
        $.address.change(function(event) {
	   		   var address=event.value;
			   var results=$('#address ul li[data-address='+address+']');
			   var index=results.index('li');
			   var nrPage=index+1;
			   if(!nrPage){
				  nrPage=1;   
			   }
			   $('#book').turn('page',nrPage);
			   //console.log("change = ");
	   })

		 
		
		$('#book').turn({
			display: 'double',
			acceleration: true,
			elevation:50,
			page:nrPage,
			when: {
				first: function(e, page) {
					$('.nav_arrow.prev').hide();
				},
				
				turned: function(e, page) {
					
					if (page > 1) {
						$('.nav_arrow.prev').fadeIn();
						$('#about').hide();
					}
					
					if(page==1){	
						$('#about').css('z-index',11);
					}
							
					
					if ( page < $(this).turn('pages') ) {
						$('.nav_arrow.next').fadeIn();
					}
					update_fonts();
					$(this).setPage(page);
					
					
				},
				
				turning: function(e, page) {
							
					if (page < 2) {
						$('#about').show();
					}else{
						$('#about').css('z-index',5);
					}
					
						
						
				},
				
				last: function(e, page) {
					$('.nav_arrow.next').hide();
				}	
			}
		});
		Book.arrows();
		
			
		
		
		
	},

	scaleHorizontal: function() {
		        screen_height	= $(window).height()-toolsHeight;;
				book_width		= WIDTH_BOOK
				screen_width	= $(window).width();
		        book_height		= HEIGHT_BOOK;
				
				var new_width		= screen_width-(autoMarginL+autoMarginR);
				var new_height		= book_height*new_width/book_width;
				$('#page').css({ width: new_width, height: new_height });
			    $('#book').turn('size', new_width, new_height);
	},

	scaleStart: function() {
		if ( on_start == true ) {
			bookHeightCheck();			
			on_start = false;
		}
	},

	scaleVertical: function() {
		        screen_height	= $(window).height()-toolsHeight;;
				book_width		= WIDTH_BOOK
				screen_width	= $(window).width();
		        book_height		= HEIGHT_BOOK;
				
		   		var new_height		= screen_height -  ( autoMarginT+autoMarginB  )  ;
				var new_width		= book_width*new_height/book_height;
				$('#page').css({ width: new_width, height: new_height });
			    $('#book').turn('size', new_width, new_height);
	},

	zoom_auto: function() {
       
		dbl_clicked = false;
		current_zoom_step = 0;
		calculate_zoom_factor(true);
				
		Book.scaleStart();	
			
		screen_width	= $(window).width();	
		screen_height	= $(window).height()-toolsHeight;;
		deltaW= screen_width-($('#page').width()+ ( autoMarginL+autoMarginR ) );
	    deltaH= screen_height-$('#page').height()
			
		if(deltaW > deltaH  ){ 
			Book.scaleVertical();
		}else{
			Book.scaleHorizontal();
		}
		
		
		  
		 if($('#page').width()>WIDTH_BOOK||$('#page').height()>HEIGHT_BOOK){
			$('#page').css({ width: default_page_width, height: default_page_height });
			$('#book').turn('size',default_book_width,default_book_height);
		 }

		update_fonts()
	},

	zoom_in: function(dbl) {
		if ( dbl_clicked == false ) {
			
			if (dbl == true) {
				zoom_factor = $('#book').height() * (ZOOM_STEPS_SIZE*3);
			}

			current_zoom_step ++;
			book_height		= $('#book').height();
			book_width		= $('#book').width();
			new_height		= book_height + zoom_factor;
			ratio			= new_height / book_height;			
			new_width		= book_width * ratio;
	
			$('#page').css({ width: new_width, height: new_height });
			$('#book').turn('size', new_width, new_height);

			Book.dragdrop_init();
			
		}
		update_fonts()
	},
	
	zoom_out: function() {
		if ( dbl_clicked == false ) {
				
			
			current_zoom_step --;
			book_height		= $('#book').height();
			book_width		= $('#book').width();
			new_height		= book_height - zoom_factor;
			ratio			= new_height / book_height;			
			new_width		= book_width * ratio;
	
			$('#page').css({ width: new_width, height: new_height });
			$('#book').turn('size', new_width, new_height);
		
			Book.dragdrop_init();

		} else {
			Book.zoom_auto();
		}
		update_fonts()
	}

}



var Navigation = {
	
	tooltip: function() {

		$('.menu li').filter(':not(.goto)').each(function() {
			description = $('a', this).attr('title');
			tooltip = '<span class="tooltip">'+description+'<b></b></span>';
			$('a', this).removeAttr("title");
			$(this).append(tooltip);
		});
		
		$('.menu li').mousemove(function(e) {
			var offset = $(this).offset(); 
			var relX = e.pageX - offset.left;
			var relY = e.pageY - offset.top;
			$('.tooltip', this).css({ left: relX, top: relY-45 });
		})
		
		$('.menu li').hover(function() { 
			$('.tooltip').stop();
			$('.tooltip', this).fadeIn();
		}, function() {
			$('.tooltip').hide();
		});
		
		update_fonts()

	},


    ///event mouse down in book 
	book_mouse_down: function(){
   			$('#about').css('z-index',5);
	},
	
	book_mouse_up: function(e){
		 var offset = $(this).offset();
		 var relativeX = (e.pageX - offset.left);
         if( relativeX > ( WIDTH_BOOK / 2 )  ){
			$('#about').css('z-index',11); 
		 }
	    
	},

	init: function() {
	
		self = this;		

		// Double Click
		$('#page').dblclick(function() {
			current_zoom_step = 0;

			if ( dbl_clicked == true ) {
				$('#page').css('cursor', 'default');
				Book.zoom_auto();
				Book.dragdrop_init();
				dbl_clicked = false;
				calculate_zoom_factor(true);
			} else {
				Book.book_grab();
				Book.zoom_auto();
				Book.zoom_in(true);
				dbl_clicked = true;
			}
			Book.book_position();
		});

		// Home 
		$('nav .home').on('click', function() {
			//$('#book').turn('page', 1);
			$(document).setPage(1);
		});
	
		// Zoom Original
		$('nav .zoom_original').click(function() {
			current_zoom_step = 0;

			$('#page').css({ width: default_page_width, height: default_page_height });
			$('#book').turn('size', default_book_width, default_book_height);
			Book.book_position();
			Book.dragdrop_init();
		});
	
		// Zoom Auto
		$('nav .zoom_auto').on('click', function() {
			Book.zoom_auto();
			Book.book_position();
			Book.dragdrop_init();
		});

		// Zoom In
		$('nav .zoom_in').on('click', function() {
			if ( current_zoom_step < zoom_steps ) {
				Book.zoom_in();
				Book.book_position();
			}				
		});
	
		// Zoom Out
		$('nav .zoom_out').on('click', function() {
			if ( current_zoom_step > -zoom_steps ) {
				Book.zoom_out();
				Book.book_position();
			}
		});

		// All Pages
		$('nav .show_all').on('click', function() {
			$('#all_pages').
				addClass('active').
				css('opacity', 0).
				animate({ opacity: 1 }, 1000);
			Book.all_pages();
			return false;
		})
		
		// Goto Page
		$('#page-number').keydown(function(e) {
			if (e.keyCode == 13) $('#book').turn('page', $('#page-number').val());
		});
		
		$('.goto button').click(function(e) {
			$('#book').turn('page', $('#page-number').val());
		});


		// Contact
		$('nav .contact').click(function() {
			$('#contact').addClass('active').animate({ opacity: 1 }, 1000);
			contact_form();
			clear_on_focus();
			return false;
		})
		
		//change z-index in about
		$('#book').bind('mousedown',this.book_mouse_down);
		$('#book').bind('mouseup',this.book_mouse_up);
		if (isiPhone()) {//for IPhone		
		$('#book').bind('touchstart',this.book_mouse_down);
		$('#book').bind('touchend',this.book_mouse_up);
		}
		
		
		
		
		if (!isiPhone()) {
			self.tooltip();
		}
		
		
		
	}
}



/* = Start
-------------------------------------------------------------- */

$(window).bind('keydown', function(e){

	if (e.keyCode==37)
		$('#book').turn('previous');
	else if (e.keyCode==39)
		$('#book').turn('next');

});	




$(window).load(function(){
	
	$.mobile.loading( 'hide');
	
    $.address.strict(false)
	
	$('#page').show();
	Book.init();
	
	Book.zoom_auto();
	Book.book_position();
	
	Book.dragdrop_init();

	Navigation.init();
	calculate_zoom_factor();
	
	update_fonts();
	
	
	 
})


$(window).resize(function() {

if (!isiPhone()) {
	Book.book_position();
	Book.zoom_auto();
	Book.dragdrop_init();
}
	calculate_zoom_factor();

});



/*
 * $ Easing v1.3 - http://gsgd.co.uk/sandbox/$/easing/
 *
 * Uses the built in easing capabilities added In $ 1.1
 * to offer multiple easing options
*/

$.easing["jswing"]=$.easing["swing"];$.extend($.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return $.easing[$.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-$.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return $.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return $.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})



/* =  center DIV  
--------------------------*/

jQuery.fn.center = function () {
	
	var iframe=$('iframe',this);
	var old_w=iframe.attr("width");
	var old_h=iframe.attr("height");
    iframe.css("position","absolute");
	
	var stage_w=$(window).width();
	var stage_h=$(window).height();
	var delta_w=stage_w-old_w;
	var delta_h=stage_h-old_h
	
	if(delta_w<delta_h){
		var new_w=$(window).width()-200;
		var new_h=(new_w*old_h)/old_w
	}else{
		var new_h=$(window).height()-200;
		var new_w=(old_w*new_h)/old_h
	}
	iframe.attr("width", new_w);
	iframe.attr("height",new_h);
	
	var height=iframe.height();
	var width=iframe.width();
	iframe.css("top", ( $(window).height()/2 - height/2+"px"));
    iframe.css("left", ( $(window).width()/2 -width/2+"px"  ));
}


/* =  event resize for Mobile Device 
--------------------------*/

$(window).bind('orientationchange resize', function(event){
	 update_fonts() 
	Book.zoom_auto();
	Book.book_position();
	 
      if(event.orientation) {
            if(event.orientation == 'portrait') {
		           $('#lightbox').center();
            } else if (event.orientation == 'landscape') {
    			   $('#lightbox').center();
            } 
      } else {
              	   $('#lightbox').center();
            }

      });


/* =  show lightbox with video 
--------------------------*/

 $.fn.youtube = function(id_,w_,h_) {

	 var w=w_;
	 var h=h_;
	 var id=id_;
	 
	$('body').prepend('<div id="lightbox"><div class="bcg"></div><iframe class="youtube-player" width='+w+' height='+h+' src="http://www.youtube.com/embed/'+id+'?html5=1" frameborder="0" allowfullscreen></iframe></div>');
  
    $(window).trigger('orientationchange');
	  	
	$("#lightbox").click(function(){
		$(this).children().hide();
		$(this).remove();
	})
	
	$("#lightbox").css('display','block');
	
 };
 
 
 
/* =  set Page
--------------------------*/
     
 $.fn.setPage = function(nr_) {
	  var results= $('#address ul li').eq( nr_-1 );
	  var address = results.attr('data-address');
	  $(this).setAddress(address);	 
 };
 

/* =  set Address
--------------------------*/

  $.fn.setAddress = function(address_) {
	   $.address.value( address_ );
  };

  


/* =  scale fonts 
--------------------------*/

function update_fonts(){
		
	//////scale p
	resize_font(14,'.page_book > p')
	
	//////scale h1
	resize_font(24,'.page_book > h1')
	
	//////scale h3
	resize_font(20,'.page_book > h3')
	
	//////scale list li
	resize_font(14,'.page_book  ul li')
	
	
	
	///SCALE ABOUT
	
	//////scale about p
	resize_font(11,'#about p')
	
	//////scale about h3
	resize_font(22,'#about h3')
	
}

function resize_font($size_original_,path_){
	$w=$('#page').width();
	$size= ($size_original_*$w)/WIDTH_BOOK;
	$new_size=Math.round(parseInt($size))+"px";
	$(path_).css('font-size',$new_size);
	$(path_).css('line-height',$new_size);
}






			

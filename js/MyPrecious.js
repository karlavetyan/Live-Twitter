window.onload=function(){
var cssRule = "font-family: Arial;" + "color: #ffffff;" + "font-size: 60px;" + "font-weight: bold;" + "text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);" + "filter: dropshadow(color=rgba(0,0,0,0.2), offx=1, offy=1);"; 
console.log("%cKarl Avetyan", cssRule);


OnLoading();

$(".clc").on('click', function(evt) {
/* Կոճակների անիմացիա */
	var elem = $(this);
	var multiple = false;
	(this.getAttribute("multiple-ink")== 'true')?multiple = true:true;
	if(!multiple)
		{
			if(elem.find(".ink").length == 0)
				elem.prepend("<span class='ink'></span>");
		}
	else
		elem.prepend("<span class='ink'></span>");
	var display = elem.css("display");
	(display=='inline'||display=='inline-block')?elem.css({display:'inline-block'}):elem.css({display:'block'});
	var ink = elem.find('.ink');
	ink.addClass('inkDefaultColor');
	if($(this).is('[ink-color]'))
	{
		var inkColor = this.getAttribute("ink-color");
		if(inkColor!="")
		{
			ink.removeClass('inkDefaultColor');
			ink.addClass(inkColor);
		}
	}
	(!multiple)?ink.removeClass('animate'):true;
	if(!ink.width()&&!ink.height())
		{
			var max = Math.max(elem.outerWidth(),elem.outerHeight());
			ink.css({width:max+'px',height:max+'px'});
		}
	var x = evt.pageX - elem.offset().left - ink.width()/2;
	var y = evt.pageY - elem.offset().top - ink.height()/2;
	ink.css({top:y+'px',left:x+'px'});
	setTimeout( function(){ink.addClass('animate');},1);
});


/* Շարժվող Header */
(function($){
	$(function(){	
			var scroll = $(document).scrollTop();
			var headerHeight = 105;
			

			$(window).scroll(function() {
			ChangeHead();
				var scrolled = $(document).scrollTop();
								
	if (scrolled > headerHeight){
					$('header').addClass('off-canvas');
					$('header').addClass('posfix');	
				} else {
					$('header').removeClass('off-canvas');
					$('header').removeClass('posfix');
				}

			    if (scrolled < scroll && scrolled > headerHeight*2){
				
					$('header').addClass('fixed');
					$('header').addClass('posfix');
			    } else {
				$('header').removeClass('fixed');		
				 }
				 
				scroll = $(document).scrollTop();	
			 });  
    
 	});
})(jQuery);   





}


function OnLoading(){
	$("#name_value").on('keydown',function(e){
		if ($("#srcbutton i").attr("class") != 'fa fa-spinner fa-pulse'){
			if(e.keyCode==13) onButtonClick()
		}	
	}); /* Enter սեղմելուց */

	$("#srcbutton").on('click', function() {
		if ($("#srcbutton i").attr("class") != 'fa fa-spinner fa-pulse'){
			onButtonClick();
		}
	}); /* Կոճակը սեղմելուց */

	$("#settingsbut").on('click', function() {SettingsButton()}); /* Կարգավորումների կոճակը սեղմելուց */


	/* Որոնման դաշտի սեսիան */
	if ($.session.get('inputval') !== undefined){
	$('#name_value').val($.session.get('inputval'));
	 ChangeHead();
	 FadeProcess();
	};


	/* Կարգավորումների սեսիան */
	if ($.session.get('secountval') !== undefined){
		$('#countval').val($.session.get('secountval'));
		$('#intval').val($.session.get('seintval'));
		if ($.session.get('sehiderp')=='false'){$("#hdrp").attr('checked', 'checked')};
		if ($.session.get('sehidert')=='false'){$("#hdrt").attr('checked', 'checked')};
	};
}



function onButtonClick() {
/* Կոճակի ֆունկցիա */
	FadeProcess();
	ChangeHead();
	$.session.set("inputval", $("#name_value").val());
}


function SettingsButton(){
/* Կարգավորումների կոճակի ֆունկցիա */
	var headh = $('header').height();
	if (headh == "130"){
		$('header').css('height','250px');
		$('.set_button').toggleClass("indeg");
	} else if ($(".inperror").css('display')=='block'){
		$('header').css('height','130px');
		$('.set_button').toggleClass("indeg");
	} else if (headh == "100"){
		$('header').css('height','220px');
		$('.set_button').toggleClass("indeg");
	}else {$('header').css('height','100px');
		$('.set_button').toggleClass("indeg");}
}	




function ChangeHead(){
/* Header-ի չափերի փոփոխում */
	var first = false;
	if (!first){
		$('header').css('height','100px');
		$('#res').css('margin-top','120px');
		setTimeout(function(){
			$('.up').fadeIn(); 
			$('header').css('display','block'); 
			$('.input').css('margin-top','40px'); 
			$('.seting').fadeIn(1000).css('display','flex');
			$('#settingsbut').fadeIn(500);
		}, 400);
		first = true;
	}
}


function FadeProcess(){
/* Տվյալների փոխանցում twittemplate() ֆունկցիա */
		$('#notf').fadeIn();
		$('#srcbutton i').removeClass("fa-twitter");
		$('#srcbutton i').addClass("fa-spinner fa-pulse");
		if  ($('header').height()!='225' && $(".inperror").css('display')=='block') {
			$('header').height(100);
			$(".inperror").fadeOut(500);
			setTimeout(function (){$("#adder").text('')}, 400);
		} else {
			$(".inperror").fadeOut();setTimeout(function (){$("#adder").text('')},400);
	    }
		$('#res').html('');
		
		countval = $('#countval').val();
		intval = $('#intval').val();
		
		if ($("#hdrp").is(':checked')){hiderp = false}else{hiderp = true};
		if ($("#hdrt").is(':checked')){hidert = false}else{hidert = true};
		
		$.session.set("secountval", countval);
		$.session.set("seintval", intval);
		$.session.set("sehiderp", hiderp);
		$.session.set("sehidert", hidert);
		
		var nvalue = $.trim($('#name_value').val().replace(/\s+/g,''));
		var namearr = nvalue.split(',');
		
		for (var i = 0; i < namearr.length; i++) {
			twittemplate($.trim(namearr[i]),'fadeIn', countval, hiderp, hidert);
		}
}


function convert_date(date){
/* Ստացված ժամային գոտու կոնվերտացիա և ամսաթվերի փոփոխում */
	var tdate = new Date(date),
	    tdday = tdate.toDateString().split(' '),
	    twettime = tdate.toTimeString().substring(0,8);

	tdday[1] = tdday[1].replace("Jan", "January");
	tdday[1] = tdday[1].replace("Feb", "February");
	tdday[1] = tdday[1].replace("Mar", "March");
	tdday[1] = tdday[1].replace("Apr", "April");
	tdday[1] = tdday[1].replace("May", "May");
	tdday[1] = tdday[1].replace("Jun", "June");
	tdday[1] = tdday[1].replace("Jul", "July");
	tdday[1] = tdday[1].replace("Aug", "August");
	tdday[1] = tdday[1].replace("Sep", "September");
	tdday[1] = tdday[1].replace("Oct", "October");
	tdday[1] = tdday[1].replace("Nov", "November");
	tdday[1] = tdday[1].replace("Dec", "December");
	return tdday[1]+' '+tdday[2]+', '+twettime+', '+tdday[3];
}


function twittemplate(uname, effect, count, replay, retwit){
/* JSON-ի ստացում և արտածում */
	var query = encodeURIComponent('screen_name='+uname+'&count='+count+'&exclude_replies='+replay+'&include_rts='+retwit);
		$.getJSON('oauth.php?url=statuses/user_timeline.json?'+query, function(jsondata){
			$('#srcbutton i').addClass("fa-twitter");
			$('#srcbutton i').removeClass("fa-spinner fa-pulse");
			   if (jsondata.length == 0) {
					unameerror();
				   function unameerror(){
				   $('.inperror').fadeIn(500); 
				   $('header').height(130); 
				   $('#res').css('margin-top','150px');
				   if ($('#res').html() == '') {$('#notf').fadeIn().css('display','flex')}; 
				   if ($("#adder").text() == ''){
				   $("#adder").append(uname);
					$("#mnog").html('user');
				   } else{ 
					   $("#adder").append('<span>,</span> '+uname);
					   $("#mnog").html('users');
					   }
					}
			   }else{ 
				 $(jsondata).each(function(index, data) {
					if (data.hasOwnProperty('errors') || data.hasOwnProperty('error')) {
						unameerror();
					}else{
						$('#notf').fadeOut();
						if (data.retweeted_status != null) {scrname='<a href="https://twitter.com/'+data.user.screen_name+'" target="_blank">@'+data.user.screen_name+'</a><a href="https://twitter.com/'+data.retweeted_status.user.screen_name+'" target="_blank" style="color: #1FD23C;"><i class="fa fa-chevron-right" style="margin: 0 4px 0 10px; font-size: 13px;"></i> @'+data.retweeted_status.user.screen_name+' ('+$.trim(data.retweeted_status.user.name)+')</a>'; twdata = data.retweeted_status.text.replace(/\n/g, "<br/>"); retdiv = '<div class="retvit"></div>';}
						else if (data.retweeted_status == null && data.in_reply_to_screen_name != null) {scrname='<a href="https://twitter.com/'+data.user.screen_name+'" target="_blank">@'+data.user.screen_name+'</a><a href="https://twitter.com/'+data.in_reply_to_screen_name+'" target="_blank" style="color: #FF4081;"><i class="fa fa-chevron-right" style="margin: 0 4px 0 10px; font-size: 13px;"></i> @'+data.in_reply_to_screen_name+'</a>'; twdata =  data.text.replace(/\n/g, "<br/>"); retdiv = ''; retdiv = '<div class="repvit"></div>';} 
						else {scrname='<a href="https://twitter.com/'+data.user.screen_name+'" target="_blank">@'+data.user.screen_name+'</a>'; twdata =  data.text.replace(/\n/g, "<br/>"); retdiv = '';}
						/*
							var nvalue = "Я",
								regEx = new RegExp(nvalue, "g"),
								replaceMask = "<span class='srch'>"+nvalue+"</span>",
								twdata = twdata.replace(regEx, replaceMask);
						*/
						template = '<div class="item ' +effect + '" tweet_id="'+data.id+'">'+
						retdiv+'<div class="itemhead">'+
						'<div class="avatar" style="background-image: url('+data.user.profile_image_url.replace("_normal", '')+');"></div>'+
						'<div id="scrname">'+emoji.a(data.user.name)+'<sup><span id="usname"> '+scrname+'</span></sup></div><div id="twdate">'+convert_date(data.created_at)+'</div></div>'+
						'<p>'+emoji.a(urlreplace(twdata))+'</p></div>';
						$('#res').append(template);
						sort();
					}
				}); 
				
				}	
			
		}); 
			
			


		 
	function urlreplace(text) {
		var exp = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
			exp2 = /#([a-zA-Zա-ֆԱ-Ֆа-яА-Я0-9_]+)/g,
			exp3 = /@(\w+)/g;
		text = text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
		text = text.replace(exp2,"<a href='https://twitter.com/hashtag/$1' target='_blank'>#$1</a>"); 
		return text.replace(exp3,"<a href='https://twitter.com/$1' target='_blank'>@$1</a>"); 
	}


	/* Անիմացիայի տեսակները՝ slideDown, fadeIn */
 
}

function sort(){
/* Տեսակավորում ըստ ամսաթվերի */
	var $wrapper = $('#res ');
	$wrapper.find('.item').sort(function (a, b) {
		return +b.getAttribute('tweet_id') - +a.getAttribute('tweet_id');
	})
	.prependTo($wrapper);   
}




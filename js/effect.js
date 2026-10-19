$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

$('document').ready(function(){
	function getRandPos() {
		var winW = $(window).width();
		var winH = $(window).height();
		var isMobile = winW < 768;
		var bWidth = isMobile ? 50 : 100;
		var maxX = Math.max(10, winW - bWidth - 15);
		var maxY = Math.max(50, winH - 240);
		return {
			left: Math.floor(Math.random() * maxX),
			bottom: Math.floor(Math.random() * maxY)
		};
	}

	function alignBalloons() {
		var winW = $(window).width();
		var isMobile = winW < 768;
		var bWidth = isMobile ? 44 : 85;
		var spacing = isMobile ? Math.min(48, (winW - 16) / 7) : 95;
		var totalSpan = spacing * 6;
		var startLeft = (winW - totalSpan) / 2 - (isMobile ? (bWidth / 4) : 0);
		var targetTop = isMobile ? 120 : 200;

		var bIds = ['#b11','#b22','#b33','#b44','#b55','#b66','#b77'];
		bIds.forEach(function(id, idx){
			if ($(id).length) {
				$(id).stop().animate({top: targetTop, left: startLeft + (idx * spacing)}, 500);
			}
		});
	}

	$(window).resize(function(){
		alignBalloons();
	});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(1000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});

	$('#play').click(function(){
		var audio = $('.song')[0];
		if (audio) {
			audio.play().catch(function(){});
		}
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('background-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(1200).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');

		$(this).fadeOut('slow').delay(1200).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');

			// Show the album photos
			$('.album-photo').fadeIn('slow');
			$('.can-zoom').fadeIn('slow');
		});
	});

	function loopOne() {
		var p = getRandPos();
		$('#b1').animate({left: p.left, bottom: p.bottom}, 9000, function(){ loopOne(); });
	}
	function loopTwo() {
		var p = getRandPos();
		$('#b2').animate({left: p.left, bottom: p.bottom}, 9000, function(){ loopTwo(); });
	}
	function loopThree() {
		var p = getRandPos();
		$('#b3').animate({left: p.left, bottom: p.bottom}, 9000, function(){ loopThree(); });
	}
	function loopFour() {
		var p = getRandPos();
		$('#b4').animate({left: p.left, bottom: p.bottom}, 9000, function(){ loopFour(); });
	}
	function loopFive() {
		var p = getRandPos();
		$('#b5').animate({left: p.left, bottom: p.bottom}, 9000, function(){ loopFive(); });
	}
	function loopSix() {
		var p = getRandPos();
		$('#b6').animate({left: p.left, bottom: p.bottom}, 9000, function(){ loopSix(); });
	}
	function loopSeven() {
		var p = getRandPos();
		$('#b7').animate({left: p.left, bottom: p.bottom}, 9000, function(){ loopSeven(); });
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},5000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();

		// Prompt Cake button after smooth delay
		$(this).fadeOut('slow').delay(1200).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(800).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').delay(600).promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

	$('#wish_message').click(function(){
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b6').attr('id','b66');
		$('#b7').attr('id','b77');

		alignBalloons();

		$('.balloons').css('opacity','0.95');
		$('.balloons h2').fadeIn(2000);
		$(this).fadeOut('slow').delay(1500).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});

		var $messages = $(".message p");
		var totalMessages = $messages.length;

		function msgLoop(i) {
			if (i < totalMessages - 1) {
				$messages.eq(i).fadeIn('slow').delay(1500).fadeOut('slow').promise().done(function(){
					msgLoop(i + 1);
				});
			} else {
				// Last message stays + cake comes back
				$messages.eq(i).fadeIn('slow').promise().done(function(){
					$('.cake').fadeIn('fast');
				});
			}
		}

		msgLoop(0);
	});
});

// Zoom (lightbox) feature
$(document).on('click', '.album-photo', function() {
    var src = $(this).attr('src');
    $('#lightbox img').attr('src', src);
    $('#lightbox').css('display', 'flex').hide().fadeIn('fast');
});

// Close when clicking outside image
$('#lightbox').click(function(e) {
    if (e.target !== this) return;
    $('#lightbox').fadeOut('fast');
});
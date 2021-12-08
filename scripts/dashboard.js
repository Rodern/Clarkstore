var isOn = 'false'
	$(".headerMenu").on('click', function() {
		$('.stackPanel').css({'width': '0px','display': 'flex'}).animate({
			width: "250px"
		},
		{
			duration: 200,
			easing: 'linear',
			complete: function() {
				isOn = 'true'
			}
		})
	});

	$('.exitPanel').on('click', function() {
		$('.stackPanel').animate({
			width: "0px"
		},
		{
			duration: 200,
			easing: 'linear',
			complete: function() {
				$('.stackPanel').css({
					'display': '',
					'width': '250px'
				});
				isOn = 'false'
			}
		})
	});


	$('.panel_list li').on('click', function() {
		alert($('.stackPanel').css('display'));
		
	});

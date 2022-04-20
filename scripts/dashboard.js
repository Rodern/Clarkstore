function stackCloseCaller() {
	$('.stackPanel').animate({
		width: "0px"
	},
		{
			duration: 200,
			easing: 'linear',
			complete: function () {
				$('.stackPanel').css({
					'display': '',
					'width': '250px'
				});
			}
		})
}
var stWidth = false;
$(".headerMenu").on('click', function() {
	if(!stWidth){
		$('.stackPanel').css({
			'width': '0px',
			'display': 'flex'
		}).animate({
			width: "250px"
		},
		{
			duration: 200,
			easing: 'linear'
		})
		stWidth = true;
	} else {stackCloseCaller(); stWidth =false }
	});

	$('.exitPanel').on('click', function() {
		/* $('.stackPanel').animate({
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
			}
		}) */

		stackCloseCaller();
		stWidth = false;
	});

	function logout_handler() {
		localStorage.setItem("loggedIn", "false");
		window.location.reload();
	}

	$('.panel_list li').on('click', function(e) {
		var itemID = e.target.id;

		if(itemID != 'clickId_log') {
			$('.panel_list li').removeClass('li_selected');

			$('#' + itemID).addClass('li_selected')
		}

		if (itemID == 'clickId_rec') {
			$('.main_content').html('');
			$('.headerCaption').text('Explore');
			var exploreDom = $.ajax({
				url: "routes/views/exploreView.html",
				success: function () {
					var eDom = $(exploreDom.responseText).appendTo($('.main_content')).ready(function () {
						load_Dock();
					});
				}
			});
		} else if (itemID == 'clickId_dash') {
			$('.main_content').html('');
			$('.headerCaption').text('Dash View');
			var dashDom = $.ajax({
				url: "routes/views/dashView.html",
				success: function () {
					var dsDom = $(dashDom.responseText).appendTo($('.main_content')).ready(function () {
					});
				}
			});
		} else if (itemID == 'clickId_db') {
			$('.main_content').html('');
			$('.headerCaption').text('Database View');
			var dbaseDom = $.ajax({
				url: "routes/views/dbView.html",
				success: function () {
					var dbDom = $(dbaseDom.responseText).appendTo($('.main_content')).ready(function () {
					});
				}
			});
		} else if (itemID == 'clickId_bs') {
			$('.main_content').html('');
			$('.headerCaption').text('Business Stats');
			var bstatsDom = $.ajax({
				url: "routes/views/statsView.html",
				success: function () {
					var dsDom = $(bstatsDom.responseText).appendTo($('.main_content')).ready(function () {
					});
				}
			});
		} else if (itemID == 'clickId_an') {
			$('.main_content').html('');
			$('.headerCaption').text('Analytics');
			var analyticsDom = $.ajax({
				url: "routes/views/analyticsView.html",
				success: function () {
					var anDom = $(analyticsDom.responseText).appendTo($('.main_content')).ready(function () {
					});
				}
			});
		} else if (itemID == 'clickId_set') {
			$('.main_content').html('');
			$('.headerCaption').text('Settings');
			var settingsDom = $.ajax({
				url: "routes/views/settingsView.html",
				success: function () {
					var sDom = $(settingsDom.responseText).appendTo($('.main_content')).ready(function () {
					});
				}
			});
		} else if (itemID == 'clickId_log') {
			popUpBox('alert', 'Are you sure you want to logout?');
			$(globalAlertConfirm).addClass('confirmLogout');
			$('.confirmLogout').on('click', function () {
				$(globalAlertConfirm).removeClass('confirmLogout');
				clearPopUpBox();
				logout_handler();
			});

			$(globalAlertCancel).addClass('cancel_logout');
			$(globalAlertCancel).on('click', function() {
				$(globalAlertConfirm).removeClass('confirmLogout');
				$(globalAlertCancel).removeClass('cancel_logout');
				clearPopUpBox();
			})
			//logout_handler();
		}
	});

	$('.grid a').on('mouseover', function(e) {
		var item_id = e.target.parentElement.id;

		if (item_id == 'enterSales') {
			dockInfoWrite('Enter Sales', 'This provides a form for you to enter your sales');
			 
		} else if (item_id == 'addItems') {
			dockInfoWrite('Add Items', 'An available form view for you to add items for sale');
			 
		} else if (item_id == 'viewItems') {
			dockInfoWrite('View Items', 'List all items, sort, manage them ');
			 
		} else if (item_id == 'category') {
			dockInfoWrite('Categories', 'Add, list and manage categories of the items');
			 
		} else if (item_id == '') {
			dockInfoWrite('Blank', 'More blank');
			 
		} else if (item_id == 'warehouse') {
			dockInfoWrite('Stock Management', 'Manage items stock easily this view');
			 
		}
	});

	$('.grid a').on('mouseleave', function() {
		$('.dockPanel').html('');
	})

	function dockInfoWrite(name, desc) {

		//$('.dockPanel').html('');
		var dom = `
				<table class="dockInfoTable">
					<tr>
						<th>Name:</th>
						<td>` + name + `</td>
					</tr>

					<tr>
						<th>Description:</th>
						<td>` + desc + `</td>
					</tr>
				</table>
			`
		$('.dockPanel').html(dom);
	}



$('.grid').on('click', function (e) {
	var item_id = e.target.parentElement.id;

	if (item_id == 'enterSales') {
		modalHandler('rec');
	} else if (item_id == 'addItems') {
		modalHandler('rec');
	} else if (item_id == 'viewItems') {
		modalHandler('rec');
	} else if (item_id == 'category') {
		modalHandler('rec');
	} else if (item_id == '') {
		modalHandler('stock');
	}
});

function modalHandler(mName) {
	var modalView, h_name;

	if(mName == 'rec') {
		h_name = 'Record Sales'
		var request = $.ajax({
			url: 'routes/modals/recModal.html',
			success: function () {
				modalView = request.responseText;
				modalCaller()
			}
		});
	} 

	function modalCaller() {
		var modalDom = `
			<div class="modalView">
				<header class="modalHeader">
					<h2 class="headerCaption" id="modalheaderCaption">` + h_name +`</h2>
					<div class="exitModal">
						<img src="images/exit.png" alt="" class="emImg">
					</div>
				</header>
				` + modalView + `
			</div>
		`
		$(modalDom).appendTo('body').ready(function() {
			$('.modalView').fadeIn(200);
		});
	}
	
}
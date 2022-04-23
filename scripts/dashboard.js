var stWidth = false;

var iiiif;
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

$(".headerMenu").on('click', function() {
	if(stWidth == false){
		stWidth = true;
		$('.stackPanel').css({
			'width': '0px',
			'display': 'flex'
		}).animate({
			width: "250px"
		},
		{
			duration: 200,
			easing: 'linear'
		});
	} else {stackCloseCaller(); stWidth = false; }
});

	$('.exitPanel').on('click', function() {
		stackCloseCaller();
		stWidth = false;
	});

	function logout_handler() {
		localStorage.setItem("loggedIn", "false");
		window.location.reload();
	}

	$('.panel_list li').on('click', function(e) {
		var itemID = e.target.id || e.target.id;

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
						$.getScript('scripts/dashboard.js');
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
		modalHandler('view');
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
			url: 'routes/modals/rec_modal.html',
			success: function () {
				modalView = request.responseText;
				modalCaller();
				var addList = $('.addedlisttable');
				GlobalData.forEach(element => {
					var li_element = `<tr class"Ldata" id="id_ ` + element.itemID + ` ">
									<td class="Ldata1" id="iid"> ` + element.itemID + ` </td>
									<td class="Ldata2" id="iname"> ` + element.Item_name + ` </td>
									<td class="Ldata3" id="itype"> ` + element.item_type + ` </td>
									<td class="Ldata4" id="iprice"> ` + element.unit_price + ` </td>
									<td class="Ldata5" id="istock"> ` + element.in_stock + ` </td>
								<tr>`;
					$(li_element).appendTo(addList);
				});
			}
		});
	}
	if (mName == 'view') {
		h_name = 'View Items'
		var request = $.ajax({
			url: 'routes/modals/items_modal.html',
			success: function () {
				modalView = request.responseText;
				modalCaller();
				var view = $('.item_view');
				setTimeout(function () {
					GlobalData.forEach(element => {
						iiiif = element.itemID;
						var li_element = `<div id="id` + element.itemID + `" class="mini_card">
											<img class="itImg" src="img/item.png" alt="">
											<span class="itName"> ` + element.Item_name + ` </span>
											<span class="itPrice"> ` + element.unit_price + ` </span>
											<img class="itEdit" src="images/editcon.png">
										</div>`;
										
						$(li_element).appendTo(view).ready(function(){
							// $('#id' + element.itemID).fadeIn(3000);
							$('#id' + element.itemID).css({
								'display' : 'flex'
							})
							setTimeout(function () {
							$('#id' + element.itemID).animate({
									opacity: "1"
								},
								{
									duration: 200,
									easing: "linear"
								});
							}, (element.itemID+'00')/1);
						
						});
					});
				}, 300);
				
				$('.mini_card').on('click', function(e){
					if (e.target.className != "itEdit"){
						var item_id = e.target.id || e.target.parentElement.id;
						alert(item_id); iiiif = e;
					} else {
						var item_id = e.target.id || e.target.parentElement.id;
						$('.modalView').fadeOut(200);
						$('.modalView').remove();
						GlobalData.forEach(element => {
							if (element.itemID == item_id.substring(2)){
								console.log(element);
							}
						});
					}
				})
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
		`;
		$(modalDom).appendTo('body').ready(function() {
			$('.modalView').fadeIn(200);
			$('.modalView').css({
				'display' : 'flex',
				'flex-direction' : 'column'
			});
			$('.exitModal').on('click', function(){
				$('.modalView').fadeOut(200);
				$('.modalView').remove();
			})
		});
	}
			$('div.added table tr:nth-child(even)').css({
				'background-color': '#f2f2f2'
			})
}
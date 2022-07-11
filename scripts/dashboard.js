var iiiif;

function logout_handler() {
	localStorage.setItem("loggedIn", "false");
	window.location.reload();
}

$('.panel_list li').on('click', function(e) {
	var itemID = e.target.id || e.target.parentElement.id;

	if(itemID != 'clickId_log') {
		$('.panel_list li').removeClass('li_selected');

		$('#' + itemID).addClass('li_selected')
	}
	$('.dockPanel').remove();
	
});

$('#clickId_rec').on('click', function () {
	$('.main_content').html('');
	$('.headerCaption').text('Explore');
	var exploreDom = "";
	exploreDom = $.ajax({
		url: "routes/views/exploreView.html",
		success: function () {
			var eDom = "";
			eDom = $(exploreDom.responseText).appendTo($('.main_content')).ready(function () {
				//$.getScript('scripts/dashboard.js');
				//removeScript("dsb");
				//loadScript("dsb", "scripts/dashboard.js");
				load_Dock();
			});
		}
	});
});

$('#clickId_dash').on('click', function () {
	$('.main_content').html('');
	$('.headerCaption').text('Dash View');
	var dashDom = $.ajax({
		url: "routes/views/dashView.html",
		success: function () {
			var dsDom = $(dashDom.responseText).appendTo($('.main_content')).ready(function () {
			});
		}
	});
});

$('#clickId_db').on('click', function () {
	$('.main_content').html('');
	$('.headerCaption').text('Database View');
	var dbaseDom = $.ajax({
		url: "routes/views/dbView.html",
		success: function () {
			var dbDom = $(dbaseDom.responseText).appendTo($('.main_content')).ready(function () {
			});
		}
	});
});

$('#clickId_bs').on('click', function () {
	$('.main_content').html('');
	$('.headerCaption').text('Business Stats');
	var bstatsDom = $.ajax({
		url: "routes/views/statsView.html",
		success: function () {
			var dsDom = $(bstatsDom.responseText).appendTo($('.main_content')).ready(function () {
			});
		}
	});
});

$('#clickId_an').on('click', function () {
	$('.main_content').html('');
	$('.headerCaption').text('Analytics');
	var analyticsDom = $.ajax({
		url: "routes/views/analyticsView.html",
		success: function () {
			var anDom = $(analyticsDom.responseText).appendTo($('.main_content')).ready(function () {
			});
		}
	});
});

$('#clickId_set').on('click', function () {
	$('.main_content').html('');
	$('.headerCaption').text('Settings');
	var settingsDom = $.ajax({
		url: "routes/views/settingsView.html",
		success: function () {
			var sDom = $(settingsDom.responseText).appendTo($('.main_content')).ready(function () {
			});
		}
	});
});

$('#clickId_log').on('click', function () {
	const LG_CallBack = function () {
		clearPopUpBox();
		logout_handler();
	};

	popUpBox('alert', 'Are you sure you want to logout?', 'confirmLogout', 'cancel_logout', LG_CallBack);
});

	$('.grid a').on('mouseover', function(e) {
		var item_id = e.target.parentElement.id;
		$(".dockPanel").fadeIn(100);

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
		$(".dockPanel").fadeOut(100);
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


	$('#enterSales').on('click', function(){
		h_name = 'Record Sales'
		var request = $.ajax({
			url: 'routes/modals/rec_modal.html',
			success: function () {
				modalView = request.responseText;
				modalCaller();
				var item_list = $('#item_list');
				var addList = $('.addedlisttable');
				ItemList.forEach(element => {
					var option = `<option value="` + element.Item_name + ` (` + element.item_type + `)">`;
					$(option).appendTo(item_list);
				});
				$('#itname').keyup(function () {
					/* var btn = $('.btn_add').text();
					if (btn != "Update"){ */
						var name = $('#itname').val().toString();
						if(name == '' || name == null){

							var qty = $('#it_qty').val('');
							var utp = $('#itprice').val('');
							var name = $('#itname').val('');
							var amt = $('#itamount').val('');
						}
						ItemList.forEach(element => {
							var str = element.Item_name + ' (' + element.item_type + ')';
							if (str == name) {
								var str = element.unit_price.substring(4);
								str = str.replace('.00', '');
								str = str.replace(',', '');
								$('#itprice').val(str);
							}
						});
					//}
				})
				var minimum_qty = 1;
				$('#it_qty').keyup(function () {
					var qty = $('#it_qty').val();
					var utp = $('#itprice').val();
					var name = $('#itname').val().toString();
					var amt = $('#itamount').val((qty/1)*(utp/1));
				})

				$('.resetbtn').on('click', function(){
					sale = new SalesItem();
					reset_es();
				});
				
				var uid = '';
				$('.btn_add').on('click', function clickAdd(e){
					var sale = new SalesItem();
					sale.item_name = TrimSpace($('#itname').val());
					sale.quantity = TrimSpace($('#it_qty').val());
					sale.amount = TrimSpace($('#itamount').val());
					sale.unit_price = TrimSpace($('#itprice').val());
					sale.date = $('#itdate').val();

					ItemList.forEach(element => {
						var str = element.Item_name + ' (' + element.item_type + ')';
						if (str == sale.item_name) {
							sale.itemID = element.itemID;
						}
					});
					
					if(sale.item_name == '' || sale.quantity == '' || sale.date == ''){
						WarnEmptyFields();
					} else {
						if(e.target.id == "btntolist"){
							if(uid != ''){
								$('#tid' + uid).remove()
							}
							var trItem = `<tr class="Ldata" id="tid` + sale.saleID + `">
									<td class="Ldata1" id="tID">` + sale.itemID + `</td>
									<td class="Ldata2 tName">` + sale.item_name + `</td>
									<td class="Ldata3 tQty">` + sale.quantity + `</td>
									<td class="Ldata4 tAmount"><span class="itC">FCFA</span>` + sale.amount + `</td>
									<td class="Ldata5 tDate">` + sale.date + `</td>
									<td class="Ldata5 tDel"><img class="itDel" src="images/delicon.png"></td>
								</tr>`;

							$(trItem).appendTo(addList);
							TempSalesList.push(sale);

							$('.itDel').on('click', function(e) {
								var did = e.target.parentElement.parentElement.id;
								$('#' + did).remove();
								var i = 0;
								TempSalesList.forEach(element => {
									if (element.saleID == did.substring(3)) {
										TempSalesList.splice(i, 1);
										return;
									}
									i += 1;
								});
							});

							$('#tid' + sale.saleID).on('click', function(e){
								if (e.target.className != "itDel"){
									uid = e.target.parentElement.id.substring(3);
									TempSalesList.forEach(element => {
										if (element.saleID != uid) {
											return;
										}
										_ = $('#itname').val(element.item_name);
										_ = $('#it_qty').val(element.quantity);
										_ = $('#itamount').val(element.amount);
										_ = $('#itprice').val(element.unit_price);
										_ = $('#itdate').val(element.date);
									});
									var btmmod = $('.btn_add');
									btmmod.text('Update');
								}
							});


							sale = new SalesItem();
							reset_es();
						}
					}
				});
			}
		});
	});

	$('#viewItems').on('click', function(){
		h_name = 'View Items'
		var request = $.ajax({
			url: 'routes/modals/items_modal.html',
			success: function () {
				modalView = request.responseText;
				modalCaller();
				var view = $('.item_view');
				setTimeout(function () {
					ItemList.forEach(element => {
						iiiif = element.itemID;
						var str = element.unit_price;
						// str = str.replace('.00', '');
						// str = str.replace(',', '');
						var li_element = `<div id="id` + element.itemID + `" class="mini_card">
											<img class="itImg" src=" ` + element.item_img + ` " alt="">
											<span class="itName"> ` + element.Item_name + ` </span>
											<span class="itPrice"> ` + str + ` </span>
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
						ItemList.forEach(element => {
							if (element.itemID == item_id.substring(2)){
								console.log(element);
							}
						});
					}
				})
			}
		});
	});

	$('#addItems').on('click', function(){
		h_name = 'Add Items'
		var request = $.ajax({
			url: 'routes/modals/add_modal.html',
			success: function () {
				modalView = request.responseText;
				modalCaller();
				setTimeout(function () { }, 300);
				var cat_list = $('#category_list');
				var addList = $('.addedlisttable');
				CategoryList.forEach(element => {
					var option = `<option value="` + element.catName + ` ">`;
					$(option).appendTo(cat_list);
				});

				$('.resetbtn').on('click', function () {
					item = new SalesItem();
					reset_es();
				});
				
				var uid = '';
				$('.btn_add').on('click', function (e) {
					var item = new Item();
					item.item_name = TrimSpace($('#it-name').val());
					item.item_type = TrimSpace($('#it-type').val());
					item.unit_price = TrimSpace($('#it-price').val());
					item.in_stock = TrimSpace($('#it-stock').val());
					item.item_cat = TrimSpace($('#it-cat').val());
					item.item_img = TrimSpace($('#it-img').val());
					
					if (item.item_name == '' || item.item_type == '' || item.unit_price == '' || item.in_stock == '' || item.item_img == '' || item.item_img == '') {
						WarnEmptyFields();
						return;
					}
					$("#itemtolist").on('click', function(){
						if (uid != '') {
							$('#tid' + uid).remove()
						}
						
						var trItem = `<tr class="Ldata" id="tid` + item.itemID + `">
								<td class="Ldata1" id="tID">` + item.itemID + `</td>
								<td class="Ldata2 tName">` + item.item_name + `</td>
								<td class="Ldata3 tType">` + item.item_type + `</td>
								<td class="Ldata4 tPrice"><span class="itC">FCFA</span>` + item.unit_price + `</td>
								<td class="Ldata5 tStock">` + item.in_stock + `</td>
								<td class="Ldata5 tCat">` + item.item_cat + `</td>
								<td class="Ldata5 tImg">` + item.item_img + `</td>
								<td class="Ldata5 tDel"><img class="itDel" src="images/delicon.png"></td>
							</tr>`;

						$(trItem).appendTo(addList);
						TempItemList.push(item);

						$('.itDel').on('click', function (e) {
							var did = e.target.parentElement.parentElement.id;
							$('#' + did).remove();
							var i = 0;
							TempItemList.forEach(element => {
								if (element.itemID == did.substring(3)) {
									TempItemList.splice(i,1);
									return;
								}
								i += 1;
							});
						});
						$('#tid' + item.itemID).on('click', function (e) {
							if (e.target.className != "itDel") {
								uid = e.target.parentElement.id.substring(3);
								TempItemList.forEach(element => {
									if(element.itemID != uid){
										return;
									}
									_ = $('#it-name').val(element.item_name);
									_ = $('#it-type').val(element.item_type);
									_ = $('#it-price').val(element.unit_price);
									_ = $('#it-stock').val(element.in_stock);
									_ = $('#it-cat').val(element.item_cat);
									_ = $('#it-img').val(element.item_img);
								});
								var btmmod = $('.btn_add');
								btmmod.text('Update');
							}
						});

						item = new Item();
						reset_es();
					});
				});
			}
		});
	});

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

			$('.exitModal').on('click', function () {
				if (TempItemList.length <= 0 && TempSalesList <= 0) {
					$('.modalView').fadeOut(200);
					$('.modalView').remove();
					CTL();
					return
				}
				function exitCallback() {
					clearPopUpBox();
					$('.modalView').fadeOut(200);
					$('.modalView').remove();
					CTL();
				}
				popUpBox('alert', 'You have unsaved items, do you want to exit this view without saving?', 'closeModal', 'cancelCloseModal', exitCallback);
				
			});
		});
	}
	$('div.added table tr:nth-child(even)').css({
		'background-color': '#f2f2f2'
	});

function reset_es() {

	_ = $('#itname, #it_qty, #itamount, #itprice, #itdate').val('');

	_ = $('#it-name, #it-type, #it-price, #it-stock, #it-cat, #it-img').val('');
	uid = '';

	var btmmod = $('.btn_add');
	btmmod.text('Add Item');
}

$('.fl-BtnCover').on('mouseover', () => {
	$('.fl-BtnCover').animate({
		height: '185px'
	},
		{
			duration: 100,
			easing: 'linear'
		});
})

$('.fl-BtnCover').on('mouseleave', () => {
	$('.fl-BtnCover').animate({
		height: '70px'
	},
		{
			duration: 100,
			easing: 'linear'
		});
})
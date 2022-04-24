let ItemList = new Array();
let TempItemList = new Array();
let SalesList = new Array();
let TempSalesList = new Array();
class Item {
    constructor(itemID, item_name, item_type, unit_price, in_stock, item_img) {
        this.itemID = itemID;
        this.item_name = item_name;
        this.item_type = item_type;
        this.unit_price = unit_price;
        this.in_stock = in_stock;
        this.item_img = item_img;
    }
}
class SalesItem {
    constructor(itemID, saleID, item_name, item_type, unit_price, quantity, amount, date) {
        this.itemID = itemID;
        this.saleID = saleID;
        this.item_name = item_name;
        this.item_type = item_type;
        this.unit_price = unit_price;
        this.quantity = quantity;
        this.amount = amount;
        this.date = date;
    }
}

if ('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('serviceWorker.js');
        console.log("Succesfully registered Service Worker");
    } catch (error) {
        console.log("Service worker registration failed" + error);
    }

}
function Loader() {
    $('body').css('background-image', "url('images/bg1.jpg')");
    $('#main_content').css('background-color', "rgba(255, 255, 255, 0.932)"); // "rgba(0, 0, 0, 0.281)");
    var headerDom = $.ajax({
        url: "routes/header.html",
        success: function () {
            var hDom = $(headerDom.responseText).appendTo($('.page_header'));
        }
    });


    var stackPanelDom = $.ajax({
        url: "routes/panels/stackPanel.html",
        success: function () {
            var stDom = $(stackPanelDom.responseText).appendTo($('body'));
        }
    });

    var exploreDom = $.ajax({
        url: "routes/views/exploreView.html",
        success: function () {
            var eDom = $(exploreDom.responseText).appendTo($('.main_content')).ready(function(){

                load_Dock();

                $.getScript('scripts/dashboard.js');
                $('.headerCaption').text('Explore');
                //$.unload('scripts/dashboard.js');
            });
        }
    });

    var JsonData = $.ajax({
        url: "database/clexan-foods.json",
        success: function () {
            //console.log(JsonData.responseText);
            ItemList = JSON.parse(JsonData.responseText);
        }
    });

}

function load_Dock() {
    var dockDom = $.ajax({
        url: "routes/panels/dockPanel.html",
        success: function () {
            var dDom = $(dockDom.responseText).appendTo($('.main_content')).ready(function () {
            });
        }
    });
}

$(document).ready(function (){
    var adminIsLoggedIn = localStorage.getItem("loggedIn");
    //alert(adminIsLoggedIn)
    if(adminIsLoggedIn == "true") {
        Loader();
    } else {
        $(document).ready(function () {
            var welcomeDom = $.ajax({
                url: "routes/welcome.html",
                success: function() {
                    var wDom = $(welcomeDom.responseText).appendTo($('.main_content')).ready(function () {
                        $.getScript('scripts/index.js', function() {
                            console.log("Scripts Loaded");
                        })
                    });
                }
            });
        });
    }
});


function popUpBox(boxType, boxMsg) {
    if (boxType == "done") {
        $('.typeImg').attr('src', 'images/done.png');
        $('.typeName').text("Done!");
        $('.alertBody').text(boxMsg);
    } else if (boxType == "alert") {
        $('.typeImg').attr('src', 'images/alert.png');
        $('.typeName').text("Alert!");
        $('.alertBody').text(boxMsg);
        $('.alertCancel').show();
    } else if (boxType == "warn") {
        $('.typeImg').attr('src', 'images/warning.png');
        $('.typeName').text("Warning!");
        $('.alertBody').text(boxMsg);
    }
    $('.alertCover').fadeIn(200);
    $('.alertCover').css('display', 'flex');
}

function clearPopUpBox() {/* 
    var reset = `<div class="alertBox">
			<div class="infoHead">
				<img src="" alt="Image" class="typeImg">
				<h2 class="typeName"></h2>
			</div> 
			<div class="alertBody">
				
			</div>
			<div class="alertOptions">
				<button type="submit" class="alertCancel" id="cancelHandler">Cancel</button>
				<button type="button" class="alertConfirm" id="alertBtnHandler">OK</button:button>
			</div>
		</div>`

    $('.alertBox').remove();
    var set = $(reset).appendTo($('.alertCover')); */

    $('.alertCover').fadeOut(200, function() {
        $('.typeImg').attr('src', '');
        $('.typeName').text("");
        $('.alertBody').text("");
        $('.alertCancel').hide();
    });
}
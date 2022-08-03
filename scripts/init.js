
var globalAlertCancel = document.getElementById('cancelHandler');
var globalAlertConfirm = document.getElementById('alertBtnHandler');

function KeyExist(key){
    let v = localStorage.getItem(key);
    if(v == null) 
        return false;
    return true;
}

function GetKeyValue(key){
    return localStorage.getItem(key);
}

function DeleteKey(key) {localStorage.removeItem(key)}

function SetKeyValue(key, val){
    localStorage.setItem(key, val);
}

class Item {
    constructor(itemID = (new Date()).getTime(), item_name, item_type, unit_price, in_stock, item_cat, item_img) {
        this.itemID = itemID;
        this.item_name = item_name;
        this.item_type = item_type;
        this.unit_price = unit_price;
        this.in_stock = in_stock;
        this.item_cat = item_cat;
        this.item_img = item_img;
    }
}

class SalesItem {
    constructor(saleID = (new Date()).getTime(), itemID, item_name, unit_price, quantity, amount, date) {
        this.saleID = saleID;
        this.itemID = itemID;
        this.item_name = item_name;
        this.unit_price = unit_price;
        this.quantity = quantity;
        this.amount = amount;
        this.date = date;
    }
}

class Category {
    constructor(catID, catName, NoP = 0){
        this.catID = catID;
        this.catName = catName;
        this.NoP = NoP;
    }
}

const _item = new Item();
const _sales = new SalesItem();
const _category = new Category();

let ItemList = new Array();
let TempItemList = new Array();
let SalesList = new Array();
let TempSalesList = new Array();
let CategoryList = new Array();
var stWidth = false;

if(!KeyExist("ItemList")) SetKeyValue("ItemList", JSON.stringify(ItemList));
if(!KeyExist("SalesList")) SetKeyValue("SalesList", JSON.stringify(SalesList));
if(!KeyExist("CategoryList")) SetKeyValue("CategoryList", JSON.stringify(CategoryList));

function loadScript(id, url){
    var script = document.createElement('script');
    script.setAttribute("src", url);
    script.setAttribute("id", id);
    document.body.appendChild(script);
}

function removeScript(id){
    $('#' + id).remove();
}

function SetClose(e){
    $('.empty_input').css({ left: e.currentTarget.offsetWidth + (e.currentTarget.offsetWidth/1.5), top: e.currentTarget.offsetHeight })
}

function stackCloseCaller() {
    $('.stackPanel').animate({
        width: "0px"
    },
        {
            duration: 100,
            easing: 'linear',
            complete: function () {
                $('.stackPanel').css({
                    'display': '',
                    'width': '250px'
                });
                $('.st-cover').css({
                    'display': '',
                    'width': '250px'
                });
            }
        })
}

function TrimSpace(text,pos = 1,UP = false) {
    if(pos == -1)
        return text.trimStart();
    if(pos == 0)
        return text.trimEnd();
    if(pos == 1)
        return text.trim();
}

function CTL() {
    TempItemList = new Array();
    TempSalesList = new Array();
}

function WarnEmptyFields(){
    popUpBox('warn', 'Field(s) are empty! Please check again.');
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
            $.getScript('scripts/header.js');
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
                load_Foot();
                //$.getScript('scripts/dashboard.js');
                loadScript("dsb", "scripts/dashboard.js");
                $('.headerCaption').text('Explore');
                //$.unload('scripts/dashboard.js');
            });
        }
    });

    ItemList = JSON.parse(GetKeyValue("ItemList"));
    SalesList = JSON.parse(GetKeyValue("SalesList"));
    CategoryList = JSON.parse(GetKeyValue("CategoryList"));

    /* var JsonData = $.ajax({
        url: "database/clexan-foods.json",
        success: function () {
            //console.log(JsonData.responseText);
            ItemList = JSON.parse(JsonData.responseText);
        }
    });

    let CatData = $.ajax({
        url: "database/categories.json",
        success: function () {
            CategoryList = JSON.parse(CatData.responseText);
        }
    }); */

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

function load_Foot() {
    var Footer = $.ajax({
        url: "routes/footer.html",
        success: function () {
            var footerDom = $(Footer.responseText).appendTo($('#page_footer')).ready(function () {
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


function popUpBox(boxType, boxMsg, OKCN, cancelCN = "CN_Class", CallBack = function () {
    $(globalAlertConfirm).removeClass(OKCN);
    clearPopUpBox(); 
}) {
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
    $('.alertCover').attr('tabindex', -1).focus(function(){
        //console.log('hit');
    });
    $('.alertCover').on('keyup', function(e){
        if (e.which === 13 && $('.alertCover').css('display') == 'flex'){
            e.preventDefault();
            CallBack();
        }
    })

    $('.alertCover').fadeIn(150);
    $('.alertCover').css('display', 'flex');

    $(globalAlertConfirm).addClass(OKCN);
    $(globalAlertCancel).addClass(cancelCN);

    $(globalAlertCancel).on('click', function () {
        $(globalAlertConfirm).removeClass(OKCN);
        $(globalAlertCancel).removeClass(cancelCN);
        clearPopUpBox();
    });

    $(globalAlertConfirm).on('click', function () {
        CallBack();
        $(globalAlertConfirm).removeClass(OKCN);
    });
}

function clearPopUpBox() {
    $('.alertCover').fadeOut(150, function() {
        $('.typeImg').attr('src', '');
        $('.typeName').text("");
        $('.alertBody').text("");
        $('.alertCancel').hide();
    });
}
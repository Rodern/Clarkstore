function Loader() {
    var headerDom = $.ajax({
        url: "routes/header.html",
        success: function () {
            var hDom = $(headerDom.responseText).appendTo($('.page_header'));
        }
    });


    var stackPanelDom = $.ajax({
        url: "routes/stackPanel.html",
        success: function () {
            var stDom = $(stackPanelDom.responseText).appendTo($('body'));
        }
    });

    var exploreDom = $.ajax({
        url: "routes/views/exploreView.html",
        success: function () {
            var eDom = $(exploreDom.responseText).appendTo($('.main_content')).ready(function(){
                $.getScript('scripts/dashboard.js');
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
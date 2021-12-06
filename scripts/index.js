$(document).ready(function(){
    $('button#login').on('click', function myLoginHandler() {
        var username = $('#inputUserName').val();
        var password = $('#inputPassword').val();
        if (username == null || username == "") {
            $('#inputError-0').html("Please provide username");
        }
        if (password == null || password == "") {
            $('#inputError-1').html("Please provide password");
        } 
        
        if ( (password != "" && password != null) && (username != "" && username != null) ) {
            if(username == 'clarks') {
                if(password == 'pass') {
                    $('#welcomeView').animate({
                            marginLeft: "-200px",
                            opacity: "0"
                        },
                        {
                            duration: 200,
                            easing: "linear",
                            complete: function () {
                                $('#welcomeView').remove();
                                Loader();
                                localStorage.setItem("loggedIn", "true");
                            }
                    });
                } else {
                    popUpBox('warn', 'Wrong password! Please check again.');
                    $(globalAlertConfirm).addClass('closeInError');
                    $('.closeInError').on('click', function () {
                        $(globalAlertConfirm).removeClass('closeInError');
                        clearPopUpBox();
                    });
                }
            } else {
                popUpBox('warn', 'Wrong username! Please check again.');
                $(globalAlertConfirm).addClass('closeInError');
                $('.closeInError').on('click', function () {
                    $(globalAlertConfirm).removeClass('closeInError');
                    clearPopUpBox();
                });
            }
        }
    });
});
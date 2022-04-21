$(document).ready(function () {

    $('#inputUserName').on('click', function () {
        if ($('#inputUserName').is(':focus')) {
            $('#inputError-0').html('');
        }
    });

    $('#inputPassword').on('click', function () {
        if ($('#inputPassword').is(':focus')) {
            $('#inputError-1').html('');
        }
    });

    function validateFormEntry(username, password) {
        if (username == null || username == "") {
            $('#inputError-0').html("Please provide username");
        }
        if (password == null || password == "") {
            $('#inputError-1').html("Please provide password");
        }
    }


    $('#inputUserName').keyup(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            // submitForm();
            $('#inputPassword').focus();
        }
    });

    $('#inputPassword').keyup(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var username = $('#inputUserName').val();
        var password = $('#inputPassword').val();
        
        validateFormEntry(username, password);

        if ((password != "" && password != null) && (username != "" && username != null)) {
            if (username == 'clarks') {
                if (password == 'pass') {
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
    }

    $('button#login').on('click', function myLoginHandler() {
        submitForm();
    });

});
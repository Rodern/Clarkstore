$(document).ready(function () {

    $('#inputUserName').on('click', function (e) {
        if ($('#inputUserName').is(':focus')) {
            $('#inputError-0').html('');
            console.log(e);
            $('.empty_input').css({ left: e.currentTarget.offsetWidth + (e.currentTarget.offsetWidth/1.5), top: e.currentTarget.offsetHeight });
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
            $('#inputPassword').focus();
        }
    });

    $('#inputPassword').keyup(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            $('#inputPassword').blur();
            submitForm();
        }
    });

    function submitForm() {
        var username = TrimSpace($('#inputUserName').val()).toLowerCase();
        var password = TrimSpace($('#inputPassword').val()).toLowerCase();
        
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
                    popUpBox('warn', 'Wrong password! Please check again.', 'closeInError');
                }
            } else {
                popUpBox('warn', 'Wrong username! Please check again.', 'closeInError');
            }
        }
    }

    $('button#login').on('click', function myLoginHandler() {
        submitForm();
    });

});
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
    $('button#login').on('click', function myLoginHandler(e) {
        submitForm();
    });

});



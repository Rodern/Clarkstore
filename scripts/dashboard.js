
    $(".headerMenu").on('click', function() {
        $('.stackPanel').css('display', 'flex').animate({
            width: "250px"
        },
        {
            duration: 200,
            easing: 'linear'
        })
    });

    $('.exitPanel').on('click', function() {
        $('.stackPanel').animate({
            width: "0px"
        },
        {
            duration: 200,
            easing: 'linear',
            complete: function() {
                $('.stackPanel').css('display', 'none');
            }
        })
    });

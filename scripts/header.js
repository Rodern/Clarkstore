$(".headerMenu").on('click', function () {
    if (stWidth == false) {
        stWidth = true; console.log(25);
        $('.stackPanel').css({
            'width': '0px',
            'display': 'flex'
        }).animate({
            width: "250px"
        },
            {
                duration: 100,
                easing: 'linear'
            });
    } else if (stWidth == true) { console.log(23); stackCloseCaller(); stWidth = false; }
});

$('.exitPanel').on('click', function () {
    stackCloseCaller();
    stWidth = false;
});


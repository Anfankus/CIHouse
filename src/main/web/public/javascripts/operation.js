'use strict'
$(function () {
    var animationDuration = 1000;

    function flipCard(card, animationName) {
        $(card).addClass(animationName);
        setTimeout(function () {
            $(card).find('.side').each(function () {
                $(this).toggleClass('alternative');
            });
        }, animationDuration / 2);
        setTimeout(function () {
            $(card).removeClass(animationName);
        }, animationDuration);
    }

    $('.flipcard').click(function () {
        flipCard(this, 'flip-right');
    });

    $('.arrow-left').click(function () {
        $('.flipcard').each(function (i) {
            var card = this;
            setTimeout(function () {
                flipCard(card, 'flip-left');
            }, i * 200);
        });
    });

    $('.arrow-right').click(function () {
        $('.flipcard').each(function (i) {
            var card = this;
            setTimeout(function () {
                flipCard(card, 'flip-right');
            }, i * 200);
        });
    });
});
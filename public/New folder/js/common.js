$(document).ready(function() {

    if ($('.style-select').length)
        $('.style-select').niceSelect();

    // $('.command-panel__btn-edit').click(function() {
    //     $(this).parents('.command-widget').find('input, select').prop('disabled', false);
    //     $(this).parents('.command-widget').find('.nice-select').removeClass('disabled');
    // });

    if ($('#start-date').length) {
        $('#start-date').appendDtpicker({
            "closeOnSelected": true,
            "dateOnly": true,
            "dateFormat": "DD-MM-YYYY"
        });
    }

    if ($('#finish-date').length) {
        $('#finish-date').appendDtpicker({
            "closeOnSelected": true,
            "dateOnly": true,
            "dateFormat": "DD-MM-YYYY"
        });
    }


    $('.form__date-btn').click(function() {
        $(this).parent().find('input').focus();
    });


    strLength('.widget__title-txt', 55);

    function strLength(str, length) {
        $(str).each(function() {
            var review_full = jQuery(this).html();
            var review = review_full;
            if (review.length > length) {
                review = review.substring(0, length);
                jQuery(this).text(review + '...');
            }

        });

    }

    (function() {
        var models = $('.models');

        if (models.length) {
            models.owlCarousel({
                loop: true,
                items: 1,
                nav: false,
                dots: false,
                mouseDrag: false,
                touchDrag: false
            });

            $('.model-nav__prev').click(function() {
                models.trigger('prev.owl.carousel', [300]);
            });

            $('.model-nav__next').click(function() {
                models.trigger('next.owl.carousel', [300]);
            });
        }
    })();


    if ($('.widget__help').length) {

        $('.widget__help').each(function() {
            if ($(this).closest('.content__col-full').length ||
                $(this).closest('.content__col:nth-child(odd)').length) {
                $(this).addClass('right');
            } else {
                $(this).addClass('left');
            }
        })
    }

    $('.model__nav-link').click(function(e) {
        e.preventDefault();

        var identef = $(this).attr('href'),
            parent = $(this).closest('.model');

        parent.find('.model__img, .model__data').fadeOut(0);
        console.log(identef);

        if (identef == 'img') {

            parent.find('.model__img').fadeIn();
        } else {
            parent.find('.model__data').fadeIn();
        }
    })


});

function setTableHeight() {

    var body = $('.widget__body');

    if (body.length) {
        body.each(function() {
            var parent = $(this).closest('.widget:not(.widget_h_a)'),
                h = parent.outerHeight() - parent.find('.widget__title').outerHeight();

            $(this).css('height', h);
        })
    }
}

$(document).ready(setTableHeight);
$(window).resize(setTableHeight);


// отображение названия загружаемого изображения
$('.file input').change(function() {
    var val = $(this).val().split('\\').pop();
    $(this).parent().find('.file__value').text(val);
});

function addMessage() {
    if($('.news ').length) {
        var message = '<div class="message message-denger">До окончания проекта осталось 14 часов 52 минуты</div>';
        $('body').prepend(message);
    }
}
$(document).ready(addMessage);



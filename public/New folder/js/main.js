$(document).ready(function() {
    $('.scale__real-input').on('change', function() {
        $(this).parents('.scale').find('label').removeClass('scale__label_state_active');
        $(this).parent().addClass('scale__label_state_active');
        $(this).parents('.scale').find('.scale__block').removeClass('scale__state_option_active');
        $(this).parents('.scale').find('.scale__line').removeClass('scale__state_option_active');
        $(this).parents('.scale__block').prevAll().addClass('scale__state_option_active');
    });
    $('.marketing-list__name').click(function() {
        $(this).siblings('.marketing-list__box-model-container').slideToggle();
    });

    if ($('.form__select').length) {
        $('.form__select').niceSelect();
    }
    if ($('.marketing-list').length) {
        $('.marketing-list').perfectScrollbar();
    }
    if ($('.left-side-body_type_scroll').length) {
        $('.left-side-body_type_scroll').perfectScrollbar({
            suppressScrollX: true
        });
    };

    if ($('.data-table:not(.model-table)').length) {
        $('.data-table:not(.model-table)').perfectScrollbar();
    };

    if ($('.form__list-cnt').length) {
        $('.form__list-cnt').perfectScrollbar();
    };

    if ($('.list-data__inner').length) {
        $('.list-data__inner').perfectScrollbar({
            suppressScrollX: true
        });
    };
    $('.widget__title-arrow').click(function(e) {
        e.preventDefault();
        $(this).parents('.widget__title').next().slideToggle();
        $(this).parents('.widget').toggleClass('widget_height_auto');
        $(this).children().toggleClass('rotate');
        setHeight();
    });
    $('.left-nav__title').click(function() {
        $(this).next().slideToggle('slow');
    });
    (function() {
        var marketingModels = $('.marketing-list__box-model');

        if (marketingModels.length) {
            marketingModels.owlCarousel({
                loop: true,
                items: 1,
                nav: true,
                dots: false,
                touchDrag: false,
                mouseDrag: false,
                navText: ['<img src="img/chevron-left.png"/>', '<img src="img/chevron-right.png"/>']
            });
        }
    })();
    setHeight();
    $(window).on('resize', function() {
        setHeight();
        removeRotate();
        setWidth();
    });
    $('.left-side-title__block').click(function() {
        $('.left-side-title__icon').toggleClass('rotate');
        $(this).parent().next().slideToggle();
    })
    removeRotate();
    $('.modal-help__question-title').click(function() {
        $(this).next().slideToggle();
        $(this).toggleClass('active-question');
    })
    setWidth();
});

function setWidth() {
    var windowWidth = $(window).width();
    var leftSideWidth = $('.left-side').width();
    $('.nav-panel').width(windowWidth - leftSideWidth);
    $('.content').width(windowWidth - leftSideWidth);
}

function removeRotate() {
    if ($(window).width() > 1024) {
        $('.left-side-title__icon').removeClass('rotate');
    }
}

function setHeight() {

    var content = $('.content').height();
    var leftSide = $('.left-side').height();
    var navPanel = $('.nav-panel').length ? $('.nav-panel').height() : 0;
    if (window.innerWidth > 1024) {
        if (content > leftSide) {
            $('.left-side').height(content + navPanel);
            $('content').css('min-height', new String(leftSide - navPanel));
        } else {
            $('content').css('min-height', new String(leftSide - navPanel));
            $('.left-side').height(content + navPanel);
        }
    } else {
        $('.content').height('auto');
        $('.left-side').height('auto');
    }
}

function addCount(selector, maxValue, interval) {
    var count = $(selector).siblings('.spinner-input__field').val();
    count = parseInt(count, 10) + interval;
    if (count <= maxValue) {
        $(selector).siblings('.spinner-input__field').val(count);
    } else {
        return false;
    }
}

function minusCount(selector, minValue, interval) {
    var count = $(selector).siblings('.spinner-input__field').val();
    count = parseInt(count, 10) - interval;
    if (count >= minValue) {
        $(selector).siblings('.spinner-input__field').val(count);
    } else {
        return false;
    }
}
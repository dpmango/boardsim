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

    $('.left-side-btn').click(function() {
        $('.left-side').toggleClass('left-side__mobile');
        $(this).find('img').toggleClass('left-side-btn__rotate');
        $(this).toggleClass('left-side__opened');
    })

    if ($('.form__select').length) {
        $('.form__select').niceSelect();
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
    $('.widget__title').on('click', function(e) {

        e.preventDefault();

        if (e.target == this ||
            e.target == $(this).find('.widget__title-arrow')[0] ||
            e.target == $(this).find('.widget__title-arrow-ico')[0] ||
            e.target == $(this).find('.widget__title-txt')[0]) {

            $(this).parent().toggleClass('widget_close');
            $(this).next().slideToggle();
            $(this).parents('.widget').toggleClass('widget_height_auto');
            $(this).find('.widget__title-arrow-ico').toggleClass('rotate');

        }

    });
    $('.left-nav__title').click(function() {
        $(this).next().slideToggle('slow');

    });
    $('.right-side__body-inner').perfectScrollbar({
        suppressScrollX: true
    });

    $('.nav-panel__item_location_rightside').click(function(e) {
        e.preventDefault();
        $('.nav-panel__item_location_rightside').removeClass('active-tab');
        $(this).addClass('active-tab');
        $('.right-side__container').removeClass('active-right-side');
        if ($('#chat-switch').hasClass("active-tab")) {
            $('#chat').addClass('active-right-side')
        }
        if ($('#news-switch').hasClass("active-tab")) {
            $('#news').addClass('active-right-side')
        }
        openRightSide()
    });


    $('.nav-panel__btn').click(function() {
        var rightSide = $('.right-side').width();
        $('.nav-panel__icon').toggleClass('rotate-tab-icon');
        if (rightSide) {
            closeRightSide();

        } else {
            $('.nav-panel__item_location_rightside').removeClass('active-tab');
            $('#chat-switch').addClass('active-tab');
            $('#chat').addClass('active-right-side');
            openRightSide()

        }
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
    leftSideSetPosition();
    $(window).on('resize', function() {
        if ($(window).innerWidth() > 1199) {
            $('.left-side').removeClass('left-side__mobile');
            $('.left-side-btn').find('img').removeClass('left-side-btn__rotate');
            $('.left-side-btn').removeClass('left-side__opened');

        }
        removeRotate();
        setWidth();
        setRightSideWidth();
        leftSideSetPosition();

    });
    $('.modal').on('show.bs.modal', function(e) {
        console.count();
        setRightSideWidth();
        setWidth();
    });

    $('.left-side-title__block').click(function() {
        $('.left-side-title__icon').toggleClass('rotate');
        $(this).parent().next().slideToggle();

    });
    removeRotate();
    $('.modal-help__question-title').click(function() {
        $(this).next().slideToggle();
        $(this).toggleClass('active-question');
    })
    setWidth();
});

function openRightSide() {
    var windowWidth = window.innerWidth;
    var leftSideWidth = $('.left-side').width();
    var rightSide = $('.right-side').width();
    var rightNavPanel = $('.nav-panel__list_type_content').width();

    if (windowWidth > 1199) {
        $('.right-side').animate({
            opacity: 1,
            width: String(rightNavPanel)
        }, 300, function() {

        });
        $('.content').animate({
            width: String($('body').width() - leftSideWidth - rightNavPanel)
        }, 300)
    } else {
        $('.right-side').animate({
            opacity: 1,
            width: String(rightNavPanel)
        }, 300, function() {

        });
    }
}

function closeRightSide() {
    $('.nav-panel__item_location_rightside').removeClass('active-tab');
    $(this).find('.nav-panel__icon').removeClass('rotate-tab-icon');

    var rightSide = $('.right-side').width();
    var windowWidth = window.innerWidth;
    var leftSideWidth = $('.left-side').width();
    if (rightSide) {
        if (windowWidth > 1199) {
            $('.right-side').animate({
                width: "0"
            }, 300);
            $('.content').animate({
                width: String($('body').width() - leftSideWidth)
            }, 300)
        } else {
            $('.right-side').animate({
                width: "0"
            }, 300);

        }
        // $('.right-side__container').removeClass('active-right-side');
    }
}

function setRightSideWidth() {
    var rightSide = $('.right-side');
    var rightNavPanel = $('.nav-panel__list_type_content').width();
    var windowWidth = window.innerWidth;
    if (rightSide.width()) {
        rightSide.width(rightNavPanel);
    }
}

// function setHeight() {

//     var header = $('.header').height();
//     var navPanel = $('.nav-panel').height() ? $('.nav-panel').height() : 0;
//     $('.right-side__body-inner').height($(window).height() - header - navPanel - 300);

// }

function setWidth() {
    var windowWidth = window.innerWidth
    var leftSideWidth = $('.left-side').width() ? $('.left-side').width() : 0;
    var rightSide = $('.right-side').width() ? $('.right-side').width() : 0;
    var rightNavPanel = $('.nav-panel__list_type_content').width() ? $('.nav-panel__list_type_content').width() : 0;
    if (windowWidth >= 1200) {
        $('.nav-panel').width($('body').width() - leftSideWidth);
        if (rightSide) {
            $('.content').width($('body').width() - leftSideWidth - rightNavPanel);
        } else {
            $('.content').width($('body').width() - leftSideWidth);
        }
    } else {
        $('.content').width('100%');
        $('.nav-panel').width('100%');
    }
}

function removeRotate() {
    if ($(window).width() > 1199) {
        $('.left-side-title__icon').removeClass('rotate');
    }
}


function leftSideSetPosition() {
    if (window.innerWidth < 1200) {
        var header = $('.header').innerHeight();
        $('.left-side').css('top', String(header + 'px'));
        $('.left-side-btn').css('top', String(header + 'px'));
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
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

    if ($('#deadline-date').length) {
        $('#deadline-date').appendDtpicker({
            "closeOnSelected": true,
            "dateOnly": true,
            "dateFormat": "DD-MM-YYYY"
        });
    }


    $('.form__date-btn, .date__btn').click(function() {
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





// отображение названия загружаемого изображения
$('.file input').change(function() {
    var val = $(this).val().split('\\').pop();
    $(this).parent().find('.file__value').text(val);
});

function addMessage() {
    if ($('.news ').length) {
        var message = '<div class="message message-denger">До окончания проекта осталось 14 часов 52 минуты</div>';
        $('body').prepend(message);
    }
}
$(document).ready(addMessage);



$('.tab-list__link').click(function(e) {
    e.preventDefault();

    var blockId = $(this).attr('href'),
        tabs = $(this).parent().parent().find('.tabs > div');

    tabs.fadeOut(0);
    $(blockId).fadeIn();

    $(this).parent().removeClass('active');
    $(this).addClass('active');

});




//sort

var sortobj = {

    sortData: [],

    createDataArr: function(that, tbody, number) {
        var self = this;
        self.sortData = [];
        tbody.find('tr').each(function() {
            self.sortData.push({
                'value': $(this).find('td:nth-child(' + number + ') span').text(),
                'html': $(this).html()
            });
        });
        console.log(self.sortData);
    },

    checkMethod: function(that, tbody, spans) {
        var self = this;
        if (!that.hasClass('desc')) {
            console.log(that);
            spans.removeClass('asc desc');
            that.addClass('desc');
            console.log('desc');
            self.sort({
                data: self.sortData,
                method: 'desc',
                tbody: tbody
            });
        } else {
            spans.removeClass('asc desc');
            that.addClass('asc');
            console.log('asc');

            self.sort({
                data: self.sortData,
                method: 'asc',
                tbody: tbody
            });
        }
    },

    sort: function(option) {
        var self = this;

        option.data.sort(function(a, b) {
            var a, b;

            if (new Date(a.value).getTime()) {
                a = new Date(a.value).getTime();
                b = new Date(b.value).getTime();
                console.log(a, b);
            } else {
                a = a.value;
                b = b.value;
            }

            switch (option.method) {
                case 'desc':
                    return a < b;
                case 'asc':
                    return a > b;
            }

        });
        console.log(option.data);
        self.createTable(option.tbody, option.data);

    },

    createTable: function(tbody, data) {
        tbody.html('');
        $.each(data, function(i, val) {
            tbody.append('<tr class="data-table__r">' + val.html + '</tr>');
        });
    }

};


$('.stream .data-table__h-txt').click(function() {
    var tbody = $(this).closest('table').find('tbody'),
        spans = $(this).closest('table').find('th span'),
        number = $(this).closest('th').index() + 1;

    sortobj.createDataArr($(this), tbody, number);
    sortobj.checkMethod($(this), tbody, spans);

});

//end sort

$(document).ready(function() {
    setHeight();
});
$(window).on('resize', function() {
    setHeight();
});


function setHeight() {
    console.log('resize');

    $('.content__col:first-child .widget').each(function() {
        //console.log($(this));
       var widget      = $(this),
           widgetIndex = widget.index(),
           sibling     = widget.closest('.content__col')
                         .siblings('.content__col')
                         .find('.widget:not(.widget_auto)').eq(widgetIndex);


       console.log(widget.outerHeight());
       console.log(sibling.outerHeight());

        if($('body').width() > 1024) {
            if(sibling.length) {
                if(widget.find('.data-table_height_a').length) {
                    setSiblingsWithTableHeight(widget, sibling);
                } else {
                    setSiblingsHeight(widget, sibling);
                }

            }
        } else {
            widget.css('height', 'auto');
            sibling.css('height', 'auto');
        }

    });


    // $('.data-table_height_a').each(function () {
    //     var widget = $(this).closest('.widget'),
    //         widgetIndex = widget.index(),
    //
    //         sibling = $(this).closest('.content__col')
    //             .siblings('.content__col')
    //             .find('.widget:not(.widget_auto)').eq(widgetIndex),
    //         siblingT = sibling.find('.data-table_height_a');
    //
    //     if (sibling.length) {
    //         if($('body').width() > 1024) {
    //             if (siblingT.length) {
    //
    //                 if ($(this).outerHeight() > siblingT.outerHeight())
    //                     sibling.css('height', widget.outerHeight());
    //                 else
    //                     widget.css('height', sibling.outerHeight());
    //
    //             } else {
    //                 sibling.css('height', widget.outerHeight());
    //             }
    //         } else {
    //             widget.css('height', 'auto');
    //             sibling.css('height', 'auto');
    //         }
    //
    //
    //     }
    //
    //
    // });

}


function setSiblingsHeight(widget, sibling) {
    //console.log('setSiblingsHeight');
    if(widget.outerHeight() > sibling.outerHeight()) {
        console.log(1);
        sibling.css('height', widget.outerHeight() )
    } else {
        widget.css('height', sibling.outerHeight() )
    }
}

function setSiblingsWithTableHeight(widget, sibling) {
    //console.log('setSiblingsWithTableHeight');
    var widgetT = widget.find('.data-table_height_a'),
        siblingT = sibling.find('.data-table_height_a');

    if(sibling.find('.data-table_height_a').length) {
        if (widgetT.outerHeight() > siblingT.outerHeight())
            sibling.css('height', widget.outerHeight());
        else
            widget.css('height', sibling.outerHeight());
    } else {
        sibling.css('height', widget.outerHeight());
    }
}









$(document).ready(function() {
    setTableHeight();
});
$(window).on('resize', function() {
    setTableHeight();
});

function setTableHeight() {

    var body = $('.widget__body');

    if (body.length) {

            body.each(function() {
                if(!$(this).find('.data-table_height_a').length) {
                    var parent = $(this).closest('.widget'),
                        h = parent.outerHeight() - parent.find('.widget__title').outerHeight();

                    $(this).css('height', h);
                }
            });

    }
}




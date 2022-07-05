$(document).ready(function () {
    // Navbar
    $(window).scroll(function () {
        $('#navbar').toggleClass('scrolled',
            $(this).scrollTop() > 50);
    });


    // Telephone form
    $('.phone__btn').on('click', function () {
        $('#modal-wrapper').addClass('active');
    })
    $('#overlay').on('click', function () {
        $('#modal-wrapper').removeClass('active');
    })
    $('.btn-wrapper').on('click', function () {
        $('#modal-wrapper').removeClass('active');
    })

    // Form validation
    $('[data-submit]').on('click', function (e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod("regex", function (value, element, regexp) {
        var regExsp = new RegExp(regexp);
        return regExsp.test(value);
    }, "Проверьте правильность данных"
    );

    $('form').each(function () {
        $(this).validate({
            rules: {
                firstName: {
                    required: true,
                    regex: "[A-Za-z-А-Яа-я]{1,32}"
                },
                telephone: {
                    digits: true,
                    required: true,
                    minlength: 10,
                    maxlength: 11,
                    regex: "^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$"
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                }
            },
            messages: {
                firstName: "Введите ваше имя правильно",
                telephone: "Введите ваш номер правильно",
                email: "Введите ваш email правильно"
            },

            submitHandler: function (form) {
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    case 'feedbackForm':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .done(function () {
                                console.log('Success');
                            })
                            .fail(function () {
                                console.log('Fail');
                            })
                            .always(function () {
                                console.log('Always');
                                setTimeout(function () {
                                    $('#modal-window-feedback').fadeIn();
                                    $form.trigger('reset');
                                }, 700);
                                $('#btn-feedback-close').on('click', function (e) {
                                    $('#modal-wrapper').fadeOut();
                                });
                                if ($('#modal-window-feedback').fadeIn()) {
                                    $('#modal-window').fadeOut();
                                };
                            });
                        break;
                    case 'form-contacts':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize()
                        })
                            .done(function () {
                                console.log('Success');
                                setTimeout(function () {
                                    $('#success-message').fadeIn();
                                    $form.trigger('reset');
                                }, 1100);
                                $('#success-message').on('click', function (e) {
                                    $(this).fadeOut();
                                });
                            })
                            .fail(function () {
                                console.log('Fail');
                                setTimeout(function () {
                                    $('#fail-message').fadeIn();
                                    $form.trigger('reset');
                                }, 700);
                                $('#fail-message').on('click', function (e) {
                                    $(this).fadeOut();
                                });
                            })
                        break;
                }
                return false;
            }
        });
    });

    // Scroll Up
    $('#back-top a').on("click", function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // Slider
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        asNavFor: '.slider-gallery',
    });
    $('.slider-gallery').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        focusOnSelect: true,
        asNavFor: '.slider',
    })
    $('.slider-team').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    // Shop buttons
    $('.switcher').click(function () {
        let currTab = $(this).index();

        $('.switcher').removeClass('active-black');
        $(this).addClass('active-black');
    })

    // Pagination
    $('.pagination').click(function () {
        let currTab = $(this).index();

        $('.pagination').removeClass('active-black');
        $(this).addClass('active-black');
    })
    $('.pagination-arrow').click(function () {
        $('.first-page').removeClass('active-black');
        $('.second-page').addClass('active-black');
    })

    // Size choise
    $('.size-list__btn').click(function () {
        let currTab = $(this).index();

        $('.size-list__btn').removeClass('active-black');
        $(this).addClass('active-black');
    })

    // Color choise
    $('.color-list__btn').click(function () {
        let currTab = $(this).index();

        $('.color-list__btn').removeClass('color-list__btn-active');
        $(this).addClass('color-list__btn-active');
    })
});
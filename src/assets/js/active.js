(function ($) {
    'use strict';

    var welcomeSlide = $('.welcome_slides');

    // :: 2.0 Welcome Slider Active Code
    if ($.fn.owlCarousel) {
        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 1000
        });
    }


})(jQuery);
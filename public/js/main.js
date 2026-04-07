$(document).ready(function() {
    // === 1. HERO CAROUSEL LOGIC ===
    let slides = $('.slide');
    let currentIndex = 0;
    let duration = 5000; 

    function nextSlide() {
        slides.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides.eq(currentIndex).addClass('active');
        startProgress();
    }

    function startProgress() {
        $('.progress-bar').html('<div class="bar-fill"></div>');
        $('.bar-fill').css({
            'height': '100%',
            'width': '0%',
            'background': 'white',
            'transition': `width ${duration}ms linear`
        });
        
        setTimeout(() => {
            $('.bar-fill').css('width', '100%');
        }, 50);
    }

    startProgress();
    setInterval(nextSlide, duration);

    // === 2. SWIPER INITIALIZATION ===
    const swiper = new Swiper('.product-swiper', {
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto', // Allows shoes to peek from sides
        spaceBetween: 0, 
        speed: 600,
        // Add this to prevent the slider from "stealing" the click
        touchStartPreventDefault: false, 
        on: {
            slideChange: function () {
                const activeSlide = $(this.slides[this.activeIndex]);
                const data = activeSlide.find('.data-store');
                $('#display-name').text(data.data('name'));
                $('#display-color').text(data.data('desc'));
                $('#display-price').text(data.data('price'));
            }
        }
    });

    // === 3. CURSOR & CLICK LOGIC ===
    const cursor = $('#custom-cursor');

    // Show/Hide cursor only on the slider area
    $('.product-swiper').on('mouseenter', function() {
        cursor.show();
    }).on('mouseleave', function() {
        cursor.hide();
    });

    $(window).on('mousemove', function(e) {
        cursor.css({ 
            left: e.clientX, 
            top: e.clientY 
        });
        
        if (e.clientX > $(window).width() / 2) {
            cursor.find('.arrow-icon').text('→');
        } else {
            cursor.find('.arrow-icon').text('←');
        }
    });

    // Click to slide logic
    $(document).on('click', '.product-swiper', function(e) {
        const windowWidth = $(window).width();
        if (e.clientX > windowWidth / 2) {
            swiper.slideNext(); 
        } else {
            swiper.slidePrev();
        }
    });

    const exploreSwiper = new Swiper('.explore-swiper', {
    // Disable fluid slides to respect the CSS 412px width
    slidesPerView: 'auto', 
    spaceBetween: 15,
    centeredSlides: false,
    grabCursor: true,
    navigation: {
        nextEl: '.ex-next',
        prevEl: '.ex-prev',
    },
    // Prevent the slider from stretching slides
    watchSlidesProgress: true,
    normalizeSlideIndex: true
});
});
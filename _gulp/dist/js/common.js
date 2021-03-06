'use strict'

// Document ready
$(document).on('ready', function(){

  // SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  // E-mail Ajax Send
  // Documentation & Example: https://github.com/agragregra/uniMail
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled: true,
        tCounter: '%curr% из %total%'
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it
        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    showCloseBtn: false
  });

  var kitchenMenuOption = {
    loop: false,
    spaceBetween: 0,
    slidesPerView: 'auto',
    scrollbarDraggable: true,
    scrollbar: '#kitchen__menu .swiper-scrollbar',
    // scrollbarHide: false,
    breakpoints: {

    }
  };
  var interiorGalleryOption = {
    loop: false,
    spaceBetween: 0,
    slidesPerView: 'auto',
    scrollbarDraggable: true,
    scrollbar: '#interior__gallery .swiper-scrollbar',
    // scrollbarHide: false,
    breakpoints: {

    }
  };
  var kitchenListDishOption = {
    loop: true,
    spaceBetween: 0,
    nextButton: '#kitchen__list-dish .swiper-button-prev',
    prevButton: '#kitchen__list-dish .swiper-button-next',
    pagination: '#kitchen__list-dish .swiper-pagination',
    paginationClickable: true
    // effect: 'fade'
  }

  var swiper1 = new Swiper('#kitchen__menu .swiper-container', kitchenMenuOption);
  var swiper2 = new Swiper('#interior__gallery .swiper-container', interiorGalleryOption);
  var swiper2 = new Swiper('#kitchen__list-dish .swiper-container', kitchenListDishOption);

  $('.js-hamburger').on('click', function(e){
    e.stopPropagation();
    $(this).toggleClass('is-active');
    $('.header__mobile').toggleClass('is-active');
    $('body').toggleClass('overflow-hidden');
  });
  $('.header__mobile-button').on('click', function(e){
    e.stopPropagation();
    $('.header__mobile').removeClass('is-active');
    $('.js-hamburger').removeClass('is-active');
    $('body').removeClass('overflow-hidden');
  });

  headerScroll();

  $('.popup__close').on('click', function(){
    $.magnificPopup.close();
  });

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function(){
  headerScroll();
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();

    var formData = {};

    var hasFile = false;

    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function headerScroll(){
  var header = $('.header');
  var width = $(window).width();

  if ($(window).scrollTop() > header.height() + 50) {
    header.addClass('is-scroll');
  } else {
    header.removeClass('is-scroll');
  }
}

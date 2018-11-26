'use strict'

function is_display_type(display_type) {
  return (
    $('.display-type').css('content') == display_type ||
    $('.display-type').css('content') == '"' + display_type + '"'
  )
}
function not_display_type(display_type) {
  return (
    $('.display-type').css('content') != display_type &&
    $('.display-type').css('content') != '"' + display_type + '"'
  )
}

// Initiate on click and on hover sub menu activation logic
function os_init_sub_menus() {
  // INIT MENU TO ACTIVATE ON HOVER
  var menu_timer
  $('.menu-activated-on-hover').on(
    'click',
    'ul.main-menu > li.has-sub-menu',
    function() {
      var $elem = $(this)

      if ($elem.hasClass('active')) {
        menu_timer = setTimeout(function() {
          $elem
            .removeClass('active')
            .closest('ul')
            .removeClass('has-active')
        }, 30)
      } else {
        clearTimeout(menu_timer)
        $elem
          .closest('ul')
          .addClass('has-active')
          .find('> li')
          .removeClass('active')
        $elem.addClass('active')
      }
    }
  )

  // INIT MENU TO ACTIVATE ON CLICK
  $('.menu-activated-on-click').on('click', 'li.has-sub-menu > a', function(
    event
  ) {
    var $elem = $(this).closest('li')
    if ($elem.hasClass('active')) {
      $elem.removeClass('active')
    } else {
      $elem
        .closest('ul')
        .find('li.active')
        .removeClass('active')
      $elem.addClass('active')
    }
    return false
  })
}

$(function() {
  // #11. MENU RELATED STUFF

  // INIT MOBILE MENU TRIGGER BUTTON
  $('.mobile-menu-trigger').on('click', function() {
    $('.menu-mobile .menu-and-user').slideToggle(200, 'swing')
    return false
  })

  os_init_sub_menus()

  // #12. CONTENT SIDE PANEL TOGGLER

  $('.content-panel-toggler, .content-panel-close, .content-panel-open').on(
    'click',
    function() {
      $('.all-wrapper').toggleClass('content-panel-active')
    }
  )

  // EMAIL SIDEBAR MENU TOGGLER
  $('.ae-side-menu-toggler').on('click', function() {
    $('.app-email-w').toggleClass('compact-side-menu')
  })

  // EMAIL MOBILE SHOW MESSAGE
  $('.ae-item').on('click', function() {
    $('.app-email-w').addClass('forse-show-content')
  })

  if ($('.app-email-w').length) {
    if (is_display_type('phone') || is_display_type('tablet')) {
      $('.app-email-w').addClass('compact-side-menu')
    }
  }

  // #16. OUR OWN CUSTOM DROPDOWNS
  $('.os-dropdown-trigger').on('click', function() {
    if ($(this).hasClass('over')) {
      $(this).removeClass('over')
    } else {
      $(this).addClass('over')
    }
  })

  // #17. BOOTSTRAP RELATED JS ACTIVATIONS

  // #18. TODO Application

  // #19. Fancy Selector
  $('.fs-selector-trigger').on('click', function() {
    $(this)
      .closest('.fancy-selector-w')
      .toggleClass('opened')
  })
})

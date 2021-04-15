/*
CSS Browser Selector js v0.5.3 (July 2, 2013)

-- original --
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
  License: http://creativecommons.org/licenses/by/2.5/
    Contributors: http://rafael.adm.br/css_browser_selector#contributors
      -- /original --

Fork project: http://code.google.com/p/css-browser-selector/
  Song Hyo-Jin (shj at xenosi.de)
*/
function css_browser_selector(u) {
  var ua = u.toLowerCase(),
    is = function(t) {
      return ua.indexOf(t) > -1
    },
    g = 'gecko',
    w = 'webkit',
    s = 'safari',
    c = 'chrome',
    o = 'opera',
    m = 'mobile',
    v = 0,
    r = window.devicePixelRatio ? (window.devicePixelRatio + '').replace('.', '_') : '1';
  var res = [
    /* IE */
    (!(/opera|webtv/.test(ua)) && /msie\s(\d+)/.test(ua) && (v = RegExp.$1 * 1)) ?
      ('ie ie' + v + ((v == 6 || v == 7) ?
        ' ie67 ie678 ie6789' : (v == 8) ?
          ' ie678 ie6789' : (v == 9) ?
            ' ie6789 ie9m' : (v > 9 ) ?
              ' ie9m' : '')) :
      /* IE 11 */
      (/trident\/\d+.*?;\s*rv:(\d+)\.(\d+)\)/.test(ua) && (v = [RegExp.$1, RegExp.$2])) ?
        'ie ie' + v[0] + ' ie' + v[0] + '_' + v[1] + ' ie9m' :
        /* FF */
        (/firefox\/(\d+)\.(\d+)/.test(ua) && (re = RegExp)) ?
          g + ' firefox firefox' + re.$1 + ' firefox' + re.$1 + '_' + re.$2 :
          is('gecko/') ? g :
            /* Opera */
            is(o) ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 :
              (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) :
              /* K */
              is('konqueror') ? 'konqueror' :
                /* Black Berry */
                is('blackberry') ? m + ' blackberry' :
                  /* Chrome */
                  (is(c) || is('crios')) ? w + ' ' + c :
                    /* Iron */
                    is('iron') ? w + ' iron' :
                      /* Safari */
                      !is('cpu os') && is('applewebkit/') ? w + ' ' + s :
                        /* Mozilla */
                        is('mozilla/') ? g : '',
    /* Android */
    is('android') ? m + ' android' : '',
    /* Tablet */
    is('tablet') ? 'tablet' : '',
    /* Machine */
    is('j2me') ? m + ' j2me' :
      is('ipad; u; cpu os') ? m + ' chrome android tablet' :
        is('ipad;u;cpu os') ? m + ' chromedef android tablet' :
          is('iphone') ? m + ' ios iphone' :
            is('ipod') ? m + ' ios ipod' :
              is('ipad') ? m + ' ios ipad tablet' :
                is('mac') ? 'mac' :
                  is('darwin') ? 'mac' :
                    is('webtv') ? 'webtv' :
                      is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : '') :
                        is('freebsd') ? 'freebsd' :
                          (is('x11') || is('linux')) ? 'linux' : '',
    /* Ratio (Retina) */
    (r != '1') ? ' retina ratio' + r : '',
    'js portrait'].join(' ');
  if(window.jQuery && !window.jQuery.browser) {
    window.jQuery.browser = v ? {msie: 1, version: v} : {};
  }
  document.documentElement.className += ' ' + res;
};
css_browser_selector(navigator.userAgent);

$(document).ready(()=>{

  $('select').selectric({
		labelBuilder:function(text){
			return '<span class="'+text.className+'">'+text.text+'</span>';
		}
	});

  $('body').on('click','.open_popup',function(e){
    e.preventDefault();
    if($(this).attr('data-target'))$($(this).attr('data-target')).openPopup();
  });

  $('body').on('click','.popup a.close',function(e){
    e.preventDefault();
    $(this).closest('.popup').closePopup();
  });

  //tabs
  $('body').on('click','.tabs[data-target] > *:not(.active)',function(e){
    e.preventDefault();
    const tab_parent =  $(this).closest('.tabs'),
      target = tab_parent.attr('data-target');
    if(tab_parent.length > 0 && target){

      const tab = $(this),
        tabs = tab_parent.find('>*'),
        index = tabs.index(tab),
        content = $(target).find('>*');

      tabs.removeClass('active');
      content.removeClass('active');

      tab.addClass('active');
      content.eq(index).addClass('active');
    }
  });

	if($('.blog_detail_page .owl-carousel').length>0){
		$('.blog_detail_page .owl-carousel').owlCarousel({
			margin:30,
			responsiveClass:true,
			nav:true,
			navText:['',''],
			responsive:{
				0:{
					items:2,
				},
				550:{
					items:3,
				},
			}
		});
	};

	$('.product_page .owl-carousel').owlCarousel({
		margin:30,
		responsiveClass:true,
		nav:true,
		navText:['',''],
		responsive:{
			0:{
				items:1,
			},
			570:{
				items:3,
			}
		}
	});
	$('.product_page .owl-carousel .item').click(function(){
		$('.slider_big_img img').remove();
		$(this).find('img').clone().appendTo('.slider_big_img');
	});


	var btn = $('.back_to_top');

	$(window).scroll(function() {
		if ($(window).scrollTop() > 200) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
	});

	btn.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '200');
	});

	$("#resetbtn").on("click", function (e) {
		e.preventDefault();
		// $('#theForm')[0].reset(); // Or
		$('#filter_form').trigger("reset");

	});

	$('#delivery').change(function(){
		if($(this).is(":checked")) {
			$('input[name="delivery_address"]').removeAttr("disabled")
		}
		else $('input[name="delivery_address"]').attr("disabled",'disabled').removeClass('error').val('');
	});

  $("form.validation").validationEngine({
    showPrompts:false,
    addFailureCssClassToField:"error",
		onFieldFailure:function(field){
    	if(field && field.is(':radio')){
    		$(field).closest('.check_wrap').addClass('error');
			}
		},
		onFieldSuccess:function(field){
			if(field && field.is(':radio')){
				$(field).closest('.check_wrap').removeClass('error');
			}
		}
  });

  $('[data-mask]').each(function(){
    const type = $(this).data('mask');
    switch (type){
      case "phone":
        $(this).inputmask({
            showMaskOnHover:false,
          mask: "999-99-99",
          definitions: {
            '9': {
              validator: "[0-9]",
              cardinality: 1,
              casing: "lower"
            },
            '*':{
              validator:"(10|50|51|55|60|70|77|99)",
              cardinality: 2,
            }
          }
        });
        break;
      case "number":
      case "decimal":
      case "integer":
        $(this).inputmask(type, { rightAlign: false });
        break
    }
  });

  var media = window.matchMedia("(max-width: 991px)");
  mobileSupport(media);
  media.addListener(mobileSupport);

  $('[data-match-height]').each(function () {
    $(this).find($(this).attr('data-match-height')).matchHeight();
  });

  $('#filter_btn').click(()=>$('#filter_b').toggleClass('show'));

  $('#edit-btn').click(()=>{
  	if($('#change_password').hasClass('show')){
  		$('#change_password').removeClass('show');
			$('#change_password_btn').removeClass('active');
		}
  	$('#edit_form').toggleClass('show');
		$('#edit-btn').toggleClass('active');
  });

  $('#change_password_btn').click(()=>{
  	if($('#edit_form').hasClass('show')){
			$('#edit_form').removeClass('show');
			$('#edit-btn').removeClass('active');
		}
		$('#change_password_btn').toggleClass('active');
  	$('#change_password').toggleClass('show');
	});

  $('body').on('click','.open_mobile_menu',function(){
  	$('.mobile_menu').addClass('animate');
  	setTimeout(()=>$('.mobile_menu').addClass('active'),1);
  	$('body').addClass('disable_scroll');
	});
	$('body').on('click','.open_mobile_search',function(){
		$('.mobile_search').addClass('animate');
		setTimeout(()=>$('.mobile_search').addClass('active'),1);
		$('body').addClass('disable_scroll');
	});

	$('body').on('click','#header .account',function(){
		if($.is_mobile){
			$('.mobile_user').addClass('animate');
			setTimeout(()=>$('.mobile_user').addClass('active'),1);
			$('body').addClass('disable_scroll');
		}
	});

	$('body').on('click','.mobile_popup .header .close',function(){
		const popup = $(this).closest('.mobile_popup');
		popup.removeClass('active');
		setTimeout(()=>popup.removeClass('animate'),400);
		$('body').removeClass('disable_scroll');
	});
});
$.fn.openPopup = function(){
  const elem = $(this);
  if(elem.length>0) {
    const opened_popup = $('.popup').filter('.show');

    if(opened_popup.length)opened_popup.closePopup();

    elem.addClass('show');
    setTimeout(() => elem.addClass('animate'), 1);
    elem.trigger('openPopup');
  }
};
$.fn.closePopup = function(){
  const elem = $(this);
  if(elem.length>0) {
    elem.removeClass('animate');
    setTimeout(()=>elem.removeClass('show'),400);
    elem.trigger('closePopup');
  }
};

$(function(){
  $('.hide-show').show();
  $('.hide-show span').addClass('show')
  
  $('.hide-show span').click(function(){
    if( $(this).hasClass('show') ) {
      $('input[name="login[password]"]').attr('type','text');
      $(this).removeClass('show');
    } else {
       $('input[name="login[password]"]').attr('type','password');
       $(this).addClass('show');
    }
  });
	
	$('form button[type="submit"]').on('click', function(){
		$('.hide-show span').addClass('show');
		$('.hide-show').parent().find('input[name="login[password]"]').attr('type','password');
	}); 
});

var numberSpinner = (function() {
  $('.number-spinner>.ns-btn>a').click(function() {
    var btn = $(this),
			input = btn.closest('.number-spinner').find('input'),
			max = input.attr('max')*1,
			min = input.attr('min')*1,
      oldValue = input.val().trim(),
      newVal = 0;

    if (btn.attr('data-dir') === 'up') {
      newVal = parseInt(oldValue) + 1;
    } else {
      if (oldValue > 1) {
        newVal = parseInt(oldValue) - 1;
      } else {
        newVal = 1;
      }
    }

		if(newVal<=max && newVal>=min)input.val(newVal);
  });
  $('.number-spinner>input').keypress(function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  });
	$('.number-spinner>input').blur(function(){
		var input = $(this),
			max = input.attr('max')*1,
			min = input.attr('min')*1,
			val = input.val().trim();

		if(val>max)input.val(max);
		if(val<min)input.val(min);
	});
})();

$.is_mobile = false;
const mobileSupport = media => {
  if (media.matches){
    $.is_mobile = true;
    $(document).trigger('mobile_on');
    if(!$('.mobile_menu .nav').length)mobile_menu_init();
		$('#header .search form').appendTo('.mobile_search .container');
		$('#header .account_menu').appendTo('.mobile_user .container');
  }
  else{
    $.is_mobile = false;
    $(document).trigger('mobile_off');
		$('.mobile_search form').appendTo('#header .search');
		$('.mobile_user .account_menu').appendTo('#header .account');
  }
};
function mobile_menu_init(){
	const nav = $('<ul/>').addClass('nav').appendTo('.mobile_menu .container');
	$('#header .navbar .main-nav > li').each(function(){
		const li = $('<li/>').appendTo(nav);
		const a = $('>a',this).clone().appendTo(li);
		if(a.find('i').hasClass('fa-angle-down')){
			a.find('i').removeClass('fa-angle-down').addClass('fa-angle-right');
		}
		if($(this).find('ul').length>0){
			const ul = $('<ul/>').appendTo(li);
			$(this).find('li').each(function(){
				$(this).clone().appendTo(ul);
			});
			a.click(function(e){
				e.preventDefault();
				li.addClass('active');
				$('.mobile_menu').addClass('nav_open');
			});
		}
	});
	$('#header .top .top-links a').each(function(){
		const li = $('<li/>').appendTo(nav);
		$(this).clone().appendTo(li);
	});
	$('#header .social').clone().appendTo('.mobile_menu .container');
	$('#header .contact').clone().appendTo('.mobile_menu .container');
	$('.mobile_menu .back').click(function(e){
		e.preventDefault();
		$('.mobile_menu .nav li.active').removeClass('active');
		$('.mobile_menu').removeClass('nav_open');
	});
}





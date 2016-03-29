$(document).ready(function () {
	$.fn.hasAttr = function(name) {
		 return this.attr(name) !== undefined;
	};
	function ajaxpost(urlres, datares, wherecontent, callback){
		$.ajax({
			type: "POST",
			url: urlres,
			data: datares,
			dataType: "html",
			success: function(fillter){
				$(wherecontent).html(fillter);
				BX.closeWait();
				if (!(callback && callback instanceof Function && typeof callback === 'function')) {
					return false;
				}
				callback(fillter);
			}
		});
	}

/*
	//big form clear
	(function(){
		$('.container .big-search').each(function(){
			var this_ = $(this),
				input = this_.find('.input'),
				reset = this_.find('.resets'),
				values = input.val();

			if (input.val().length > 0) {
				reset.fadeIn(150);
			}

			input.on('input', function(){
				var value = $(this).val();
				if(value.length > 0) {
					reset.fadeIn(150);
				} else {
					reset.fadeOut(100);
				}
			});
			reset.on('click', function(){
				input.val('');
				input.attr('value', '');
				$(this).fadeOut(100);
			});
		});
	})();
*/
	//show contacts
	(function(){
		var phones = $('.phones'),
			parent = phones.parent(),
			list = parent.find('.phone__list');

		phones.on('mouseenter', function(){
			parent.addClass('active');
			list.fadeIn();
		});
		parent.on('mouseleave', function(){
			parent.removeClass('active');
			list.fadeOut();
		});
	})();

	//video
	html5Video = function() {
		function stopall(){
		// stop all videos
			$('video').each(function(index, el) {
				$(this)[0].pause();
				$('.js-play').removeClass('is-paused');
			});
		}
		$('.js-play').on('click', function(event) {
			var video = $('.video-holder').find('video')[0];
			if (video.paused) {
				video.play();
				$(this).toggleClass('is-paused').parent().toggleClass('played');
			} else {
				video.pause();
				$(this).toggleClass('is-paused').parent().toggleClass('played');
			}
			return false;
		});
		$('video').each(function(index, el) {
			$(this).on('ended', function(event) {
				stopall();
				$('.js-play').removeClass('is-paused').parent().removeClass('played');
			});
		});
		if($('.slider-nav').find('video').length) {
			$('.slider-nav').find('.slider-nav__slide').on('click', function(){
				if(!$('.slider-nav__slide').find('.player')){
					stopall();
				}
			});
		}
	};

	//document click
	$(document).click(function() {
		$('.js-accordions-mod .js-accord').removeClass('is-active');
		$('.js-accordions-mod .js-accord-block').slideUp(500);
	});

	//toggle goods
	(function(){
		$('.goods .btn').each(function(){
			var this_ = $(this),
				parent = this_.parents('.goods'),
				slideBox = parent.find('.slide__box');

			this_.on('click', function(){
				if($(this).hasClass('active')){
					return false;
				} else if($(this).hasClass('btn__out')) {
					$(this).addClass('active').siblings().removeClass('active');
					slideBox.stop(true,true).slideUp(500);
				} else {
					$(this).addClass('active').siblings().removeClass('active');
					slideBox.stop(true,true).slideDown(500);
				}
			});
		});
	})();
	function getSliderSettings(){
		return {
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			speed: 500,
			infinite: true,
			prevArrow: '<button type="button" class="slick-prev"><span><svg viewBox="0 0 15 24.5" xmlns="http://www.w3.org/2000/svg"><path class="svg_arrow" d="m14.977888,21.40658l-9.169999,-9.169998l9.169999,-9.17l-2.829999,-2.83l-12,12l12,12l2.829999,-2.830002z"/><path stroke="null" id="svg_2" fill="none" d="m0.148682,0.044084l14.689654,0l0,23.974919l-14.689654,0l0,-23.974919z"/></svg></button>',
			nextArrow: '<button type="button" class="slick-next"><span><svg viewBox="0 0 15 24.5" xmlns="http://www.w3.org/2000/svg"><path class="svg_arrow" d="m0.124967,21.370632l9.17,-9.170002l-9.17,-9.17l2.83,-2.83l12,12l-12,12l-2.83,-2.829998z"/><path stroke="null" id="svg_2" fill="none" d="m7.473229,5.411077l14.913806,0l0,23.846835l-14.913806,0l0,-23.846835z"/></svg></span></button>'
		};
	}

	//tabs
	(function(){
		$('.tab__nav').each(function(){
			var link = $(this).find('a'),
				linkItem = $(this).find('li'),
				index = link.data('href'),
				parent = $(this).parents('.tab__container'),
				tab_item = parent.find('.tab__item'),
				link_cont = parent.find('.link__cont'),
				slider = $('.sliders');

			link.on('click', function(){
				var this_ = $(this),
					index = this_.data('href'),
				    locate = '/catalog/shiny/';
				/*
				if(index === "point-4"){
					location.href = locate;
					return false;
				}
				*/
				this_.parent().addClass('active').siblings().removeClass('active');
				tab_item.fadeOut(0).removeClass('visible');
				if(parent.hasClass('tab__slider')){
					if(parent.hasClass('ajax_slider')){
						$.ajax({
							type: "POST",
							url: "/bitrix/templates/main/includes/ru/template.main.news.php",
							data: "ID="+index,
							dataType: "html",
							success: function(fillter){
								$('.tab__content.ajax').html(fillter);
								$('.tab__content.ajax').find('.tab__item').fadeIn(0);
								parent.find(".tab__item").fadeIn(0).find('.sliders').slick(getSliderSettings());

								setTimeout(function(){
									$('.tab__content.ajax').find('.tab__item').addClass('visible');
								},100);
							}
						});
					}
					if(parent.hasClass('ajax_slider_block')){
						$.ajax({
							type: "POST",
							url: "/bitrix/templates/main/includes/ru/template.main.special_offers.php",
							data: "BLOCK_ID="+index,
							dataType: "html",
							success: function(fillter){
								$('.tab__content.ajax_block').html(fillter);
								$('.tab__content.ajax_block').find('.tab__item').fadeIn(0);
								parent.find(".tab__item").fadeIn(0).find('.sliders').slick(getSliderSettings());

								setTimeout(function(){
									$('.tab__content.ajax_block').find('.tab__item').addClass('visible');
								},100);
							}
						});
					}
					//parent.find("."+index).fadeIn(0).find('.sliders').slick('setPosition');
				} else {
					parent.find("."+index).fadeIn(0);
				}
				setTimeout(function(){
					parent.find("."+index).addClass('visible');
				},10);
				return false;
			});

			if(parent.hasClass('active')){
				linkItem.first().addClass('active');
				parent.find("."+index).show().addClass('visible');
			} else if(parent.hasClass('tab__slider')){
				linkItem.first().addClass('active');
				parent.find("."+index).show().addClass('visible');
			}

			link_cont.on('click', function(){
				var this_ = $(this),
					index = this_.data('href');

				this_.parents('.tab__content').find('.' + index).fadeIn(0).siblings().fadeOut(0);
				this_.parents('.tab__content').find('.' + index).addClass('visible');
				this_.parents('.tab__container').find('a[data-href=' + index + ']').parent().addClass('active').siblings().removeClass('active');
			});

			$('.fixed__case').on('click', function(event){
				event.stopPropagation();
				//return false;
			});

			$(document).on('click scroll', function(event){
				if(!parent.parents('.fixed__case').length) {
					event.stopPropagation();
				} else {
					linkItem.removeClass('active');
					tab_item.fadeOut(0).removeClass('visible');
				}
			});

		});
	})();

	//input autocomplete
	(function(){
		$('.tab__container').each(function(){
			var item = $(this).find('.mark'),
				value = item.text(),
				parent = item.parents('.tab__item'),
				input = parent.find('.input');

			item.on('click', function(){
				var value = $(this).text();

				input.val(value);

				return false;
			});
		});
	})();

	//slick init
	(function(){
		var slider = $('.sliders');
		var galleryNavigation = function(item) {
			var prev           = item.parent().find('.gallery__prev'),
				next           = item.parent().find('.gallery__next'),
				slides         = item.parent().find('.gallery__captions'),
				counterCurrent = item.parent().find('.gallery__counter-current'),
				counterAll     = item.parent().find('.gallery__counter-all'),
				gallerySlides  = item.find('.slick-slide').length - item.find('.slick-slide.slick-cloned').length;

			prev.on('click', function() {
				item.slick('slickPrev');
			});

			next.on('click', function() {
				item.slick('slickNext');
			});

			counterAll.text(gallerySlides);

			item.on('afterChange', function(slick, currentSlide) {
				var index = item.slick('slickCurrentSlide');
				index = ++index ;
				counterCurrent.text(index);
			});

		};

		if(slider.length) {
			slider.each(function(){
				var slider = $(this);

				if(slider.parent().hasClass('tab__item')) {
					slider.slick({
						arrows: true,
						slidesToShow: 4,
						slidesToScroll: 4,
						speed: 500,
						infinite: true,
						prevArrow: '<button type="button" class="slick-prev"><span><svg viewBox="0 0 15 24.5" xmlns="http://www.w3.org/2000/svg"><path class="svg_arrow" d="m14.977888,21.40658l-9.169999,-9.169998l9.169999,-9.17l-2.829999,-2.83l-12,12l12,12l2.829999,-2.830002z"/><path stroke="null" id="svg_2" fill="none" d="m0.148682,0.044084l14.689654,0l0,23.974919l-14.689654,0l0,-23.974919z"/></svg></button>',
						nextArrow: '<button type="button" class="slick-next"><span><svg viewBox="0 0 15 24.5" xmlns="http://www.w3.org/2000/svg"><path class="svg_arrow" d="m0.124967,21.370632l9.17,-9.170002l-9.17,-9.17l2.83,-2.83l12,12l-12,12l-2.83,-2.829998z"/><path stroke="null" id="svg_2" fill="none" d="m7.473229,5.411077l14.913806,0l0,23.846835l-14.913806,0l0,-23.846835z"/></svg></span></button>'
					});
				}

				if(slider.parent().hasClass('tab__content')) {
					slider.slick({
						arrows: false,
						slidesToShow: 4,
						slidesToScroll: 4,
						speed: 500,
						infinite: true
					});
					$('.card').each(function(){
						var btnPrev = $(this).parents('.row').find('.slide__prev'),
							btnNext = $(this).parents('.row').find('.slide__next');

							btnPrev.on('click', function(){
								slider.slick('slickPrev');
							});
							btnNext.on('click', function(){
								slider.slick('slickNext');
							});
					});
				}

				if(slider.hasClass('gallery__pictures')) {
					$('.gallery__pictures').on('init', function(slick) {
			            galleryNavigation($(this));
					});
					$('.gallery__pictures').slick({
						arrows: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						autoplay: true,
						autoplaySpeed: 5000,
						speed: 500,
						infinite: true,
						asNavFor: '.gallery__caption'
					});
					$('.gallery__caption').slick({
						arrows: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						autoplay: true,
						autoplaySpeed: 5000,
						speed: 500,
						infinite: true,
						asNavFor: '.gallery__pictures'
					});

				}
			});
		}
	})();

	function isHistoryApiAvailable() {
		return !!(window.history && history.pushState);
	}


	function parseUrlQuery() {
		var data = {};
		if(location.search) {
			var pair = (location.search.substr(1)).split('&');
			for(var i = 0; i < pair.length; i ++) {
				var param = pair[i].split('=');
				data[param[0]] = param[1];
			}
		}
		return data;
	}

	//multipla select
	function mselect(){
		$(".cont").each(function(){
			var multi = $(this).find('.multi'),
				drop = $(this).find('.ms-drop'),
				reset = $(this).find('.reset__filter'),
				input = $(this).find('.input');

			multi.multipleSelect({
				single: true,
				onClose: function(){
					$('.ms-choice').removeClass('is-active');
				},
				onClick: function(view){
					if(view.instance.$el.hasClass("ajax-page-count")){
						var cnt = view.value;
						$.ajax({
							type: "POST",
							data: 'cnt=' + cnt,
							dataType: "html",
							success: function(fillter){
								replace = $(fillter).find('.ajax-catalog__area').html();
								$('.ajax-catalog__area').html(replace);
								mselect();
							}
						});
						return false;
					}
					if(view.instance.$el.hasClass("ajax-sort")){
						var sort = view.value;
						$.ajax({
							data: 'sort=' + sort,
							//dataType: "html",
							success: function(fillter){
								replace = $(fillter).find('.ajax-catalog__area').html();
								$('.ajax-catalog__area').html(replace);
								mselect();
							}
						});
						return false;
					}
				}
			});

			/*reset.on('click', function(){
				multi.multipleSelect('uncheckAll');
				input.val('');
				return false;
			});*/
		});
		function activeSel() {
			var parent = $('.multi'),
				item = parent.find('> button'),
				li = parent.find('.ms-drop li');
			item.on('click', function () {
				var this_ = $(this),
					div = this_.find('> div');
				if (div.hasClass('open')) {
					$('.ms-choice').removeClass('is-active');
					div.parents('.ms-choice').addClass('is-active');
				}
				else {
					div.parents('.ms-choice').removeClass('is-active');
				}
			});
			li.on('click', function() {
				var parent = $(this).parents('.multi');
				parent.find('.ms-choice').removeClass('is-active');
			});

		}
		activeSel();
	}
	mselect();

	// spiner
	function spiner() {
		var number = $('.spinner');
		number.each(function(){
			var max_number = +($(this).attr('data-max-number'));
			var input = $(this).find('input');
			var plus = $(this).find('.spinner__plus');
			var minus = $(this).find('.spinner__minus');
			var timeout;
			var countbasketid = input.attr('id');
			plus.on('click', function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false;
				}
				else {
					val += 1;
					input.val(val);
				}
				input.trigger('change');
				return false;
			});
			minus.on('click', function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
				}
				else {
					input.val('1');
					return false;
				}
				input.trigger('change');
				return false;
			});
			input.on("change", function(){
				var val = +$(this).val();
				if (val > max_number) {
					val = max_number;
					$(this).val(val);
				}
				if (val == '' || val < 0) {
					val = 0;
					$(this).val(val);
				}
				if(input.hasClass('in-cart')){
					clearTimeout(timeout);
					timeout = setTimeout(function() {
						BX.showWait();
						var countbasketcount = input.val();
						var ajaxcount = countbasketid + '&ajaxbasketcount=' + countbasketcount;
						ajaxpost("/bitrix/templates/main/includes/ru/ajax.basket.php", ajaxcount, ".ajax-cart__area", function () {spiner(); deleteProducts(); small_basket_reload();});
					}, 500);
				}
			});
		});
	}
	spiner();

	function deleteProducts(){
		var del_link = $('a.remove.in_cart');
		del_link.on('click', function(e){
			e.preventDefault();
			var ajaxcount = $(this).data("link");
			ajaxpost("/bitrix/templates/main/includes/ru/ajax.basket.php", ajaxcount, ".ajax-cart__area", function () {spiner(); deleteProducts(); small_basket_reload();});
			if(del_link.parents('.ajax-cart__area').length) {
				del_link.parents('.basket__result').addClass('is-load');
				//console.log(true)
			}
		});
	}
	deleteProducts();

	function small_basket_reload(){
		$.ajax({
			type: "POST",
			url: "/bitrix/templates/main/includes/ru/ajax.small.basket.php",
			dataType: "html",
			success: function(fillter){
				$('.ajax-smallbasket').html(fillter);
			}
		});
	}
	//spinner count
	$('.js-price').each(function() {
		$('.spinner__input').on('change', function() {
			var total = $(this).val()*$(this).parents('.js-price').find('.result').data('price');
			total = total.toFixed(2);
			$(this).parents('.js-price').find('.result').text(total);
			$('.js-price-text').map(function() {
				$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
			});
		});
	});

	//prices
	function prices() {
		$(window).ready(function() {
			$('.js-price').each(function() {
				var val = $('.spinner__input').val();
				var total = val*$(this).find('.result').data('price');
				total = total.toFixed(2);
				$(this).find('.result').text(total);
				//$(this).find('.result').text(val*$(this).find('.result').data('price'));
			});

			$('.js-price-text').map(function() {
				$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
			});
		});
	}
	prices();

	//fixed tab tab
	function fakePrice() {
		var out = $('.out'),
			fakeBox = $('.fixed__case'),
			scrollWindow = $(window).scrollTop();

		var outTop = out.offset().top;
		if(scrollWindow >= outTop) {
			fakeBox.addClass('fixed');
		}else {
			fakeBox.removeClass('fixed');
		}
	}
	fakePrice();
	$(window).scroll(function(){
		fakePrice();
	});

	//read more
	(function() {
		$('.show__more').readmore({
			speed: 375,
			moreLink: '<a href="#">Развернуть всё описание</a>',
			lessLink: '<a href="#">Свернуть описание</a>'
		});
	})();

	//product slider
	(function(){
		var slider = $('.slider-for');
		slider.each(function(){
			var this_ = $(this);
				caption = this_.parent().find('.slider-nav');

			this_.slick({
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				infinite: true,
				asNavFor: caption,
				fade: true
			});
			caption.slick({
				arrows: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				speed: 500,
				infinite: true,
				asNavFor: this_,
				focusOnSelect: true
			});
			if(caption.find('video').length) {
				caption.find('.slider-nav__slide').on('click', function(){
					html5Video();
				});
			}
		});
	})();

	//popup slider
	(function(){
		$('.popup__slider').fancybox({
			padding: 0,
			tpl: {
				closeBtn : '<a class="fancybox-item fancybox-close" href="javascript:;"><svg viewBox="0 0 28.5 28.5" xmlns="http://www.w3.org/2000/svg"><path id="svg_1" d="m28.276947,2.974928l-2.830002,-2.83l-11.169999,11.17l-11.169998,-11.17l-2.83,2.83l11.169998,11.17l-11.169998,11.169998l2.83,2.830002l11.169998,-11.17l11.169999,11.17l2.830002,-2.830002l-11.170002,-11.169998l11.170002,-11.17z"/></svg></a>',
				next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><svg viewBox="0 0 286 512" xmlns="http://www.w3.org/2000/svg"><path d="m16.600006,512c-4.099998,0 -8.099998,-1.600006 -11.099998,-4.799988c-5.700005,-6.100006 -5.400002,-15.700012 0.799995,-21.5l241.199997,-224.5l-241.5,-235.100012c-6,-5.9 -6.099998,-15.5 -0.300003,-21.5c5.900002,-6 15.5,-6.1 21.5,-0.3l252.800003,246.2c3,2.899994 4.700012,6.899994 4.600006,11.100006c-0.100006,4.199982 -1.800018,8.100006 -4.800018,10.899994l-252.899994,235.399994c-2.899994,2.800018 -6.599991,4.100006 -10.299988,4.100006z"/></svg></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><svg viewBox="0 0 286 512" xmlns="http://www.w3.org/2000/svg"><path d="m268.5,512c-3.700012,0 -7.399994,-1.299988 -10.299988,-4.100006l-253.000015,-235.399994c-3,-2.799988 -4.800003,-6.799988 -4.800003,-10.899994c-0.099998,-4.200012 1.600006,-8.200012 4.600006,-11.100006l252.899994,-246.2c6,-5.8 15.600006,-5.7 21.5,0.3c5.799988,6 5.700012,15.600001 -0.299988,21.5l-241.5,235.100012l241.199982,224.5c6.100006,5.700012 6.5,15.299988 0.800018,21.5c-3,3.199982 -7.100006,4.799988 -11.100006,4.799988z"/></svg></span></a>'
			}
		});
	})();

	//equalheight
	(function(){
		if($('.equalheight').length){
			$('.equalheight').find('.item').matchHeight({
				property: 'min-height'
			});
		}
		if($('.catalog').length){
			$('.catalog').find('.item').matchHeight({
				property: 'min-height'
			});
		}
	})();

	//accordion
	(function(){
		$('.accordions').each(function(){
			$('.js-accord-but').on('click', function() {
				var this_ 		= $(this),
					parent 		= this_.parents('.js-accord'),
					blockThis 	= parent.find('.js-accord-block'),
					accord 		= $('.js-accord'),
					block 		= accord.find('.js-accord-block');

				if (!parent.hasClass('is-active')) {
					accord.stop(true, true).removeClass('is-active');
					block.stop(true, true).slideUp(500);
					parent.stop(true, true).addClass('is-active');
					blockThis.stop(true, true).slideDown(500);
				}
				else {
					parent.stop(true, true).removeClass('is-active');
					blockThis.stop(true, true).slideUp(500);
				}
				return false;
			 });
			$('.js-accord, .addition').on('click', function(event){
				event.stopPropagation();
			});
		});
	})();

	//sorting
	(function(){
		$('.js-sortin-item').on('click', function() {
			var this_ = $(this),
				parent = this_.parents('.js-sorting'),
				item = parent.find('.js-sortin-item'),
				active = ('is-active'),
				activeTop = ('is-active-top');
			if (!this_.hasClass(active)) {
				item.removeClass(active).removeClass(activeTop);
				this_.addClass(active);
			}
			else if (!this_.hasClass(activeTop)) {
				this_.removeClass(active).toggleClass(activeTop);
			}
		});
	})();


	//mask input
	function mask_input(){
		if($('.mask').length){
			$('.mask').inputmask({
				mask: '+9 (999) 999 99 99',
				showMaskOnHover: false,
				showMaskOnFocus: false,
				placeholder: ''
			});
		}
	}
	mask_input();

	//scroll pane
	(function(){
		if($('.order__scroll').length){
			//$('.order__scroll').attr('id', 'container');
			setTimeout(function(){
				//$('.scroll__inner').jScrollPane();
				var scrollContainer = document.getElementById('container');
				Ps.initialize(scrollContainer, {
					wheelSpeed: 0.3,
					wheelPropagation: true,
					minScrollbarLength: 20
				});
				$(window).on('resize', function(){
					Ps.update(scrollContainer);
				});
			},100);		
		}
	})();

	//validation
	function ajaxpostshow(urlres, datares){
		$.ajax({
			type: "POST",
			url: urlres,
			data: datares,
			dataType: "html"
		});
	}
	function ajaxSubmit(form){
		var formsubscrube = $(form).serialize(),
			target_php = $(form).data('php'),
			formsubscrube = formsubscrube + '&action=ajax';
		ajaxpostshow(target_php, formsubscrube);
		return false;
	}
	function ajaxpostshow1(urlres, datares, wherecontent){
		$.ajax({
			type: "POST",
			url: urlres,
			data: datares,
			dataType: "html",
			success: function(fillter){
				if(!urlres){
					fillter= $(fillter).find('.form.personal').html();
				}
				$(wherecontent).html(fillter);
				validate();
				mask_input();
				popup_init();
			}
		});
	}
	function ajaxSubmit1(form){
		var formsubscrube = $(form).serialize(),
			target_block = $(form).data('block'),
			target_php = $(form).data('php'),
			formsubscrube = formsubscrube + '&action=ajax';
		ajaxpostshow1(target_php, formsubscrube, target_block);
		return false;
	}

	function validate(){
		var form_validate = $('.js-validate');
		if (form_validate.length) {
			form_validate.each(function () {
				var form_this = $(this);
				$.validate({
					form : form_this,
					modules : 'security',
					//validateOnBlur : true,
					borderColorOnError : false,
					scrollToTopOnError : false,
					onSuccess : function($form) {
						if($form.hasClass('answer')){
							ajaxSubmit1($form);
						}else{
							ajaxSubmit($form);
							$('.popup').removeClass('is-open');
							$('.success').addClass('is-open');
							$('.popup').find('form').trigger('reset');
						}

						
						//if(!$form.is('#ORDER_FORM')){
							return false;
						//}						
					}
				});
			});
		}
	}
	validate();

	

	//custom selects
	(function(){
		var parent = $('.delivery__selects'),
			menu = parent.find('.menu'),
			list = menu.find('.menu__list'),
			tab_delivery = parent.find('.tab_delivery'),
			tab_item = tab_delivery.find('.tab_delivery-item'),
			box = parent.find('.info__box'),
			icon = box.find('.icon'),
			content__box = box.find('.content__box'),
			check_list = parent.find('.check__list');

		$(document).on('click', function(){
			menu.removeClass('active');
			list.fadeOut(150);
		});

		$('.info__box').each(function(){
			var this_ = $(this),
					icons = this_.find('.icon'),
					content__box = this_.find('.content__box');
			var scrollInfobox = document.getElementById('scroll__infobox');
			icons.on('click', function(event){
				if(content__box.hasClass('uniteller') && !$('#scroll__infobox').hasClass('.ps-container')) {
					setTimeout(function(){
						Ps.initialize(scrollInfobox, {
							wheelSpeed: 0.3,
							wheelPropagation: true,
							minScrollbarLength: 20
						});
					}, 10);
				}
				content__box.fadeToggle(300);
				event.stopPropagation();
			});
			icons.on('mouseleave', function(){
				if(content__box.hasClass('uniteller')) {
					return false;
				} else {
					content__box.fadeOut(150);
				}
			});
			content__box.on('mouseleave', function(){
				content__box.fadeOut(150);
			});
		});

		setTimeout(function(){
			parent.find('.row__selects:last-of-type .menu').addClass('not_availability');
		},10);

		menu.each(function(){
			var this_ = $(this),
				item = this_.find('.menu__item'),
				list = this_.find('.menu__list'),
				label = this_.find('label'),
				check = label.prev();

			if(list.find('input:checked').length){
				var checkIs = list.find('input:checked');
					text = checkIs.parent().find('span').text();
				item.text(text);
				this_.parents('.delivery__selects').find('.not_availability').removeClass('not_availability');
				this_.parents('.row__selects').addClass('check');
				detectedValid(this_.parents('form').attr('id'));
				this_.parents('form').find('button[type="submit"]').removeAttr('disabled');
			}

			item.on('click', function(event){
				if(this_.is('.not_availability')){
					event.preventDefault();
					return;
				}
				this_.toggleClass('active');
				list.fadeToggle(300);
				event.stopPropagation();
			});

			label.on('click', function(){
				var this_= $(this),
					text = this_.find('span').text(),
					data = this_.data('tab'),
					parent = this_.parents('.field');

				menu.removeClass('active');
				list.fadeOut(150);
				item.text(text);
				menu.parents('.delivery__selects').find('.not_availability').removeClass('not_availability');
				parent.find('.'+data).fadeIn(150).siblings().hide();

				parent.parents('.row__selects').addClass('check');

				$('.' + data ).find('input').attr('checked', false);
				setTimeout(function(){
					summItem();
				},10);

				if(item.is(':first-of-type') && this_.data('tab') === 'pickup'){
					$('#ID_DELIVERY_ID_1').attr('checked', 'checked')
				}
				
				if(item.is(':last-of-type') && this_.data('tab') === 'deliv'){
					$('#ID_DELIVERY_ID_8').attr('checked', 'checked');
					$('#ID_DELIVERY_ID_9').attr('checked', 'checked');
					setTimeout(function(){
						if($('#ID_DELIVERY_ID_9:checked') && $('#ID_DELIVERY_ID_9').length) {
							$('.delivery_sum > span').text(400 + ' ₽');
							setTimeout(function(){
								summItem();
							},10);
						}
					},10);

				}
				if(this_.attr('for') == 'ID_PAY_SYSTEM_ID_2') {
					$('#info__box').show();
				} else {
					$('#info__box').hide();
				}

				detectedValid(this_.parents('form').attr('id'));

			});
		});
		
		check_list.each(function(){
			var _ = $(this),
			    label = _.find("label");
			label.on('click', function(){
				var val = $(this).prev('input').attr("value");
				
				$('#BUYER_STORE').attr("value", val);

				if($(this).hasAttr('data-price')) {
					var dataP = $(this).data('price');
					$('.delivery_sum > span').text(dataP + ' ₽');
					setTimeout(function(){
						summItem();
					},10);
					
				} else {
					var dataP = 0;
					$('.delivery_sum > span').text(dataP + ' ₽');
					setTimeout(function(){
						summItem();
					},10);
				}
			});
		});
	})();


	function detectedValid(form) {
		var this_ = $('#' + form),
				menu = this_.find('.row__selects.check');	

		if(menu.length > 1) {
			this_.find('button[type="submit"]').removeAttr('disabled');
		};
	};


	//summ
	function summItem() {
		var box = $('.order__col'),
		item = box.find('.js-sum > span'),
		total = box.find('.total > span');
	
		arr = [];

		item.each(function(){
			var _ = $(this),
			val = _.text(),
			rep = parseFloat(parseFloat(val.replace(/ /g, '')).toFixed(2));
			//rep = parseFloat(rep);
			arr.push(rep);
			//console.log(rep)
		});		

		var result = arr.reduce(function(sum, current) {
			return sum + current;
		}, 0);
		total.text(result.toFixed(2) + '  ₽');
		box.parents('.content').find('.card__basket .item_search-price').map(function(){
			$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽.');
		});
	};
	summItem();
		

	//popup

	function popup_init(){
		var duration = 500,
			popupSelector = $('.popup__wrap'),
			innerSelector = $('.popup'),
			frame = $('html');

		$('.btn__popup').on('click', function(event){
			var popup = $(this).data('href');

			if(popup === 'reg'  || popup === 'enter' || popup === 'return') {
				if(popupSelector.hasClass("is-visible")) {
					popupSelector
						.removeClass("is-visible")
						.delay(duration)
						.fadeOut({
							duration: duration
						});
					console.log(true)
				}
			}

			if(popup === 'locations') {
				var items = $(this).data('items');
				$('.' + popup).find('.'+items).show();
				innerSelector.addClass('is-open');
				setTimeout(function(){
					if($('.' + popup).find('.'+items).find('.map_popup').hasClass('init')){
						return;
					}
					initMap($('.' + popup).find('.'+items).find('.map_popup').attr('id'));
				}, duration);

			}

			if(popup === 'one_click'){
				var product = $(this).data('id');
				$('.' + popup).find('input[name="PRODUCT"]').val(product);
			}

			$('.'+popup).fadeIn({
				duration: duration,
				complete: function(){
					frame.find('body').css('overflow', "hidden");
					$(this).addClass("is-visible");
				}
			});
			event.stopPropagation();
			event.preventDefault();
		});

		$(".popup").on("click", function(event){
			event.stopPropagation();
		});

		$(".popup__close-link, .popup__close, .popup__wrap").on("click", function(){

			if(!popupSelector.hasClass('is-visible')) return;

			popupSelector
				.removeClass("is-visible")
				.delay(duration)
				.fadeOut({
					duration: duration,
					complete: function(){
						frame.find('body').removeAttr('style');
						$('.success').removeClass('is-open');
						$('.popup:first-child').addClass('is-open');
						if($(this).hasClass('locations')) {
							$(this).find('.location__item').hide();
						}
					}
				});
			return false;
	    });


	}
	popup_init();

	if ($('#map').length) {
		ymaps.ready(init);
	}

	function init () {
		
			var cur_coordsMain = [];
				cur_coordsMain[0] = $('.coord').data('long');
				cur_coordsMain[1] = $('.coord').data('lat');
		var myMap = new ymaps.Map('map', {
				center: [cur_coordsMain[0], cur_coordsMain[1]],
				zoom: 10,
				controls: []
			}, {
				searchControlProvider: 'yandex#search'
			}),
			objectManager = new ymaps.ObjectManager({
				clusterize: true
			}),currentId = 0;

			MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="popover top">' +
					'<a class="close" href="#">&times;</a>' +
					'<div class="arrow"></div>' +
					'<div class="balloon">' +
						'$[[options.contentLayout observeSize minWidth=246 maxWidth=246]]' +
					'</div>' +
				'</div>', {
				build: function () {
					this.constructor.superclass.build.call(this);
					this._$element = $('.popover', this.getParentElement());
					this.applyElementOffset();
					this._$element.find('.close')
					    .on('click', $.proxy(this.onCloseClick, this));
				},
				clear: function () {
				    this._$element.find('.close')
				        .off('click');
				    this.constructor.superclass.clear.call(this);
				},
				onSublayoutSizeChange: function () {
					MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
					if(!this._isElement(this._$element)) {
					    return;
					}
					this.applyElementOffset();
					this.events.fire('shapechange');
				},
				applyElementOffset: function () {
					this._$element.css({
						left: -((this._$element[0].offsetWidth + 18) / 2),
						top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight + 10)
					});
				},
				onCloseClick: function (e) {
					e.preventDefault();
					this.events.fire('userclose');
					objectManager.objects.options.set({
					    iconLayout: 'default#image',
						iconImageHref: '/bitrix/templates/main/prod/img/marker.png'
					});
				},
				getShape: function () {
					if(!this._isElement(this._$element)) {
					    return MyBalloonLayout.superclass.getShape.call(this);
					}
					var position = this._$element.position();
					return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
						[position.left, position.top], [
							position.left + this._$element[0].offsetWidth,
							position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
						]
					]));
				},
				_isElement: function (element) {
					return element && element[0] && element.find('.arrow')[0];
				}
			}),

			MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
				'<h3 class="balloon__title">$[properties.balloonHeader]</h3>' +
				'<div class="balloon__content">$[properties.balloonContent]</div>'
			);

			objectManager.objects.options.set({
			    iconLayout: 'default#image',
				iconImageHref: '/bitrix/templates/main/prod/img/marker.png',
				iconImageSize: [20, 27],
				balloonShadow: false,
				balloonLayout: MyBalloonLayout,
				balloonContentLayout: MyBalloonContentLayout,
				balloonPanelMaxMapArea: 0
			});
			function onObjectEvent (e) {
				var objectId = e.get('objectId');
				if (e.get('type') == 'mouseenter') {
				    objectManager.objects.setObjectOptions(objectId, {
				        iconLayout: 'default#image',
						iconImageHref: '/bitrix/templates/main/prod/img/pin.png'
				    });
				}
				if (e.get('type') == 'mouseleave') {
				    objectManager.objects.setObjectOptions(objectId, {
				    	iconLayout: 'default#image',
				    	iconImageHref: '/bitrix/templates/main/prod/img/marker.png'
				    });
				}
				if (e.get('type') == 'click') {
					    objectManager.objects.setObjectOptions(objectId, {
				    	iconLayout: 'default#image',
				    	iconImageHref: '/bitrix/templates/main/prod/img/marker.png'
				    });
				}
			}
			objectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], onObjectEvent);

		zoomControl = new ymaps.control.ZoomControl({
			options: {
				position: {
					top: 28,
					left: 17
				}
			}
		});

		myMap.controls.add(zoomControl);

		var myObjects = [],
			location = [];

			$('.coord').each(function(index){
				var cur_coords = [];
				cur_coords[0] = $(this).data('long');
				cur_coords[1] = $(this).data('lat');
				cur_coords[2] = $(this).find('.names').text();
				cur_coords[3] = $(this).find('.coord__address').text();
				cur_coords[4] = $(this).find('.coord__phones').html() || '';
				cur_coords[5] = $(this).find('.coord__schedule').html();
				location[index] = cur_coords;

			});
			var coordinates = location;


			for (var i = 0, l = coordinates.length; i < l; i++) {
				var coord = coordinates[i];
				//console.log(coord[3]);
			    myObjects.push({
			        type: "Feature",
			        id: currentId++,
			        geometry: {
			            type: 'Point',
			            coordinates: [coord[0],coord[1]]
			        },
			        properties: {
						balloonHeader: coord[2],
						balloonContent: "<div class='balloon__address'>" + coord[3] + "</div><div class='balloon__row'>" + "<div class='balloon__col'>" + coord[4] + "</div>" + "<div class='balloon__col'>" + coord[5] +	"</div>" + "</div>"
						 ,
						// "clusterCaption": "Еще одна метка"
					}
			    });
			}

			objectManager.add(myObjects);
			myMap.geoObjects.add(objectManager);
			if($('.coord').length > 1) {
				myMap.setBounds(objectManager.getBounds());
			}
	}


	if ($('#map-inner').length) {
		ymaps.ready(initMap);
	}

	function initMap(map) {
		if (!$('.map_popup').length) {
			var maps = 'map-inner';
			var longer = $('.coord').data('long'),
				lat = $('.coord').data('lat'),
				locate = $('.coord').find('.coord__address').text(),
				phone = $('.coord').find('.coord__phones').html(),
				schedule = $('.coord').find('.coord__schedule').html();

		} else {
			var maps = map,
				parents = $('#' + map).parents('.location__item'),
				longer = parents.find('.coord').data('long'),
				lat = parents.find('.coord').data('lat'),
				locate = parents.find('.coord').find('.coord__address').text(),
				phone = parents.find('.coord').find('.coord__phones').html(),
				schedule = parents.find('.coord').find('.coord__schedule').html();

			$('#' + map).addClass('init');
		}

		var myMap = new ymaps.Map(maps, {
				center: [longer, lat],
				zoom: 16,
				controls: []
			}, {
				searchControlProvider: 'yandex#search'
			}),

			MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="popover top">' +
					'<a class="close" href="#">&times;</a>' +
					'<div class="arrow"></div>' +
					'<div class="balloon">' +
						'$[[options.contentLayout observeSize minWidth=246 maxWidth=246]]' +
					'</div>' +
				'</div>', {
				build: function () {
					this.constructor.superclass.build.call(this);
					this._$element = $('.popover', this.getParentElement());
					this.applyElementOffset();
					this._$element.find('.close')
					    .on('click', $.proxy(this.onCloseClick, this));
				},
				clear: function () {
				    this._$element.find('.close')
				        .off('click');
				    this.constructor.superclass.clear.call(this);
				},
				onSublayoutSizeChange: function () {
					MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
					if(!this._isElement(this._$element)) {
					    return;
					}
					this.applyElementOffset();
					this.events.fire('shapechange');
				},
				applyElementOffset: function () {
					this._$element.css({
						left: -((this._$element[0].offsetWidth + 18) / 2),
						top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight + 10)
					});
				},
				onCloseClick: function (e) {
					e.preventDefault();
					this.events.fire('userclose');
				},
				getShape: function () {
					if(!this._isElement(this._$element)) {
					    return MyBalloonLayout.superclass.getShape.call(this);
					}
					var position = this._$element.position();
					return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
						[position.left, position.top], [
							position.left + this._$element[0].offsetWidth,
							position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
						]
					]));
				},
				_isElement: function (element) {
					return element && element[0] && element.find('.arrow')[0];
				}
			}),

			MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="balloon__content">$[properties.balloonContent]</div>'
			);
			myPlacemark = window.myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				balloonHeader: '',
				balloonContent: ''
			}, {
				balloonShadow: false,
				balloonLayout: MyBalloonLayout,
				balloonContentLayout: MyBalloonContentLayout,
				balloonPanelMaxMapArea: 0,
				iconLayout: 'default#image',
				iconImageHref: '/bitrix/templates/main/prod/img/marker.png',
				iconImageSize: [20, 27],
				iconImageOffset: [-3, -42]
			});

	    myMap.geoObjects.add(myPlacemark);

        window.myPlacemark.properties.set(
            'balloonContent', "<div class='balloon__address'>" + locate + "</div><div class='balloon__row'>" + "<div class='balloon__col'>" + phone + "</div>" + "<div class='balloon__col'>" + schedule +	"</div>" + "</div>"
        );

		zoomControl = new ymaps.control.ZoomControl({
			options: {
				position: {
					top: 28,
					left: 17
				}
			}
		});

		myMap.controls.add(zoomControl);

	}

	//video

	(function(){
		if($('video').length){
			html5Video();
		}
	})();

	$('.ajax-add2cart').on('click', function(e){
		e.preventDefault();
		var ajaxaddid = $(this).data('id'),
			count = $(this).parents('.ajax-add2cart-container').find('.spinner__input').val(),
			file = $('.ajax-smallbasket').data('dir');
		$.ajax({
			type: "POST",
			data: "ajaxaddid=" + ajaxaddid + "&count=" + count + "&ajaxaction=add",
			url: file,
			dataType: "html",
			success: function(fillter){
				$('.ajax-smallbasket').html(fillter);
			}
		});
		return false;
	});

	$('.ajax-add2cart-auto').on('click', function(e){
		e.preventDefault();
		var ajaxaddid = $(this).data('id'),
			count = $(this).parents('tr').find('.spinner__input').val(),
			file = $('.ajax-smallbasket').data('dir');
		$.ajax({
			type: "POST",
			data: "ajaxaddid=" + ajaxaddid + "&count=" + count + "&ajaxaction=add",
			url: file,
			dataType: "html",
			success: function(fillter){
				$('.ajax-smallbasket').html(fillter);
			}
		});
		return false;
	});

	//redirect
	(function(){
		$('.ms-parent.js-redirect').each(function(){
			var _ = $(this),
			item = _.find('label input');
			item.on('click', function(){
				var lnk = $(this).val();
				location.href = lnk;
			});
		});
	})();

	$('.smartfilter input').each(function(){
		keyPress($(this));
	});

	$('.spinner__input').each(function(){
		keyPress($(this));
	});

	// keypress inputs
	function keyPress(item) {
		item[0].onkeypress = function(e) {
			e = e || event;
			if (e.ctrlKey || e.altKey || e.metaKey) return;
			var chr = getChar(e);
			if (chr == null) return;
			if (chr < '0' || chr > '9') {
				return false;
			}
		}
		item.bind("paste contextmenu", function(){return false});
	};

	function getChar(event) {
		if (event.which == null) {
			if (event.keyCode < 32) return null;
			return String.fromCharCode(event.keyCode) // IE
		}
		if (event.which != 0 && event.charCode != 0) {
			if (event.which < 32) return null;
			return String.fromCharCode(event.which) 
		}
		return null;
	};


	//progress add basket

	$('.btn_basket, .big_basket').each(function() {
		gContent($(this));
	});

	function gContent(item) {
		item.append('<span class="added">Добавлено</span>');
		addB(item);
	};

	function addB(item) {
		var this_ = item;

		this_.on('click', function() {
			var _ = $(this);

			if(_.hasClass('is-active')) {
				window.location.href = '/cart/';
				//return false;
			};

			_.addClass('is-active');
			return false;
		});
	}
	$('.spinner__plus, .spinner__minus').each(function(){
		$(this).on('click', function(){
			if ($(this).parents('.item').length){
				var _ = $(this),
						parent = _.parents('.item'),
						btn = parent.find('.btn_basket');

						btn.removeClass('is-active');
			} else {
				var _ = $(this),
					parent = _.parents('.price__box'),
					btn = parent.find('.big_basket');
					btn.removeClass('is-active');
			}
		});
	});



	$('.captcha__refresh').on('click', function(){
		var container = $(this).parents(".captcha__block");
		$.getJSON('/bitrix/templates/main/includes/ru/form/reload_captcha.php', function(data) {
			$(container).find('.captcha__img').attr('src','/bitrix/tools/captcha.php?captcha_sid='+data);
			$(container).find('input[name="captcha_word"]').attr('data-validation-req-params', '{"captcha_code": "'+data+'"}');
			$(container).find('.captcha__sid').val(data);
	 	});
	 return false;
	});

	function ajaxpostshow2(urlres, datares, wherecontent){
		$.ajax({
			type: "POST",
			url: urlres,
			data: datares,
			dataType: "html",
			success: function(fillter){
				$(wherecontent).html(fillter);
			}
		});
	}

	$('.sbm__filter.tire').on('click',function () {
		var form = $(this).closest("form"),
		formsubscrube = $(form).serialize(),
		target_block = $(form).data('block'),
		target_php = $(form).data('php'),
		formsubscrube = formsubscrube + '&action=ajax';
		ajaxpostshow2(target_php, formsubscrube, target_block);
		return false;
	});

	$('.sbm__filter.disk').on('click',function () {
		var form = $(this).closest("form"),
		formsubscrube = $(form).serialize(),
		target_block = $(form).data('block'),
		target_php = $(form).data('php'),
		formsubscrube = formsubscrube + '&action=ajax';
		ajaxpostshow2(target_php, formsubscrube, target_block);
		return false;
	});
});
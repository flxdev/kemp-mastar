$(document).ready(function () {

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
		})
	})();

	//video
	html5Video = function() {
		function stopall(){
		// stop all videos
			$('video').each(function(index, el) {
				$(this)[0].pause();
				$('.js-play').removeClass('is-paused');
			});
		};
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
					index = this_.data('href');

				this_.parent().addClass('active').siblings().removeClass('active');
				tab_item.fadeOut(0).removeClass('visible');				
				if(parent.hasClass('tab__slider')){
					parent.find("."+index).fadeIn(0).find('.sliders').slick('setPosition');
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
			};	

			link_cont.on('click', function(){
				var this_ = $(this),
					index = this_.data('href');

				this_.parents('.tab__content').find('.' + index).fadeIn(0).siblings().fadeOut(0);
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
				};

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

	//multipla select
	(function(){
		$(".cont").each(function(){
			var multi = $(this).find('.multi'),
				drop = $(this).find('.ms-drop'),
				reset = $(this).find('.reset__filter'),
				input = $(this).find('.input');

			multi.multipleSelect({
				single: true,
				onClose: function(){
					$('.ms-choice').removeClass('is-active');	
				}
			});

			reset.on('click', function(){
				multi.multipleSelect('uncheckAll');
				input.val('');
				return false;
			});
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
	})();

	// spiner
	(function() {
		var number = $('.spinner');
		number.each(function(){
			var max_number = +($(this).attr('data-max-number'));
			var input = $(this).find('input');
			var plus = $(this).find('.spinner__plus');
			var minus = $(this).find('.spinner__minus');
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
			});
		});
	})();

	//spinner count
	$('.js-price').each(function() {
		$('.spinner__input').on('change', function() {
			$(this).parents('.js-price').find('.result').text($(this).val()*$(this).parents('.js-price').find('.result').data('price'));
			$('.js-price-text').map(function() {
				$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
			})
		});
	});

	//prices
	function prices() {
		$(window).ready(function() {
			$('.js-price').each(function() {
				var val = $('.spinner__input').val();
				$(this).find('.result').text(val*$(this).find('.result').data('price'));
			});

			$('.js-price-text').map(function() {
				$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
			});
		});
	};
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
	};
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
		};
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
	(function(){
		if($('.mask').length){
			$('.mask').inputmask({
				mask: '+9 (999) 999 99 99',
				showMaskOnHover: false,
				showMaskOnFocus: false,
				placeholder: ''
			});
		}
	})();

	//scroll pane
	(function(){
		if($('.order__scroll').length){
			$('.scroll__inner').jScrollPane();
		}
	})();

	//validation
	(function(){
		var form_validate = $('.js-validate');
		if (form_validate.length) {
			form_validate.each(function () {
				var form_this = $(this);
				$.validate({
					form : form_this,
					//modules : 'security',
					//validateOnBlur : true,
					borderColorOnError : false,
					scrollToTopOnError : false,
					onSuccess : function() {
						$('.popup').removeClass('is-open');
						$('.success').addClass('is-open');
						return false;
					}
				});
			});
		}
	})();

	//custom selects
	(function(){
		var parent = $('.delivery__selects'),
			menu = parent.find('.menu'),
			list = menu.find('.menu__list'),
			tab_delivery = parent.find('.tab_delivery'),
			tab_item = tab_delivery.find('.tab_delivery-item'),
			box = parent.find('.info__box'),
			icon = box.find('.icon'),
			content__box = box.find('.content__box');

		$(document).on('click', function(){
			menu.removeClass('active');
			list.fadeOut(150);
		});

		icon.on('click', function(event){
			content__box.fadeToggle(300);
			event.stopPropagation();
		});
		icon.on('mouseleave', function(){
			content__box.fadeOut(150);
		});

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
			}		

			item.on('click', function(event){
				if(this_.is('.not_availability')){
					event.preventDefault();
				};
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
			});

		});
	})();

	//popup
	
	(function(){
		var duration = 500,
			popupSelector = $('.popup__wrap'),
			innerSelector = $('.popup'),
			frame = $('html');

		$('.btn__popup').on('click', function(event){
			var popup = $(this).data('href');

			if(popup === 'reg' || popup === 'enter' ) {
				popupSelector
					.removeClass("is-visible")
					.delay(duration)
					.fadeOut({
						duration: duration
					});
			};

			
			$('.'+popup).fadeIn({
				duration: duration,
				complete: function(){
					frame.find('body').css('overflow', "hidden");
					$(this).addClass("is-visible");
				}
			});
			event.stopPropagation();
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
					}
				});
			return false;
	    });


	})();

	if ($('#map').length) {
		ymaps.ready(init);
	};

	function init () {
		var myMap = new ymaps.Map('map', {
				center: [55.3172, 37.523285],
				zoom: 9,
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
						iconImageHref: 'prod/img/marker.png'
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
				iconImageHref: 'prod/img/marker.png',
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
						iconImageHref: 'prod/img/pin.png'
				    });
				}
				if (e.get('type') == 'mouseleave') {
				    objectManager.objects.setObjectOptions(objectId, {
				    	iconLayout: 'default#image',
				    	iconImageHref: 'prod/img/marker.png'
				    });
				}
				if (e.get('type') == 'click') {
					    objectManager.objects.setObjectOptions(objectId, {
				    	iconLayout: 'default#image',
				    	iconImageHref: 'prod/img/marker.png'
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
				cur_coords[4] = $(this).find('.coord__phones').html();
				cur_coords[5] = $(this).find('.coord__schedule').html();
				location[index] = cur_coords;

			});
			var coordinates = location;


			for (var i = 0, l = coordinates.length; i < l; i++) {
				var coord = coordinates[i];
				console.log(coord[3])
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
			myMap.geoObjects.add(objectManager)
	};


	if ($('#map-inner').length) {
		ymaps.ready(initMap);
	};

	function initMap() {
		var longer = $('.coord').data('long'),
			lat = $('.coord').data('lat'),
			locate = $('.coord').find('.coord__address').text(),
			phone = $('.coord').find('.coord__phones').html(),
			schedule = $('.coord').find('.coord__schedule').html();
		var myMap = new ymaps.Map('map-inner', {
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
				iconImageHref: 'prod/img/marker.png',
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

	};

	//video
	
	(function(){
		if($('video').length){
			html5Video();
		}			
	})();
});
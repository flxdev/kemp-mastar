$(document).ready(function () {
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

			parent.on('click', function(event){
				event.stopPropagation();
			});

			$(document).on('click', function(event){
				if(parent.hasClass('active')) {
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

		if(slider.length) {
			slider.each(function(){
				var slider = $(this);
				var nameClass = slider.parents('.row').attr('class').split(' ')[0];

				if($('.' + nameClass).hasClass('slider')) {
					slider.slick({
						arrows: true,
						slidesToShow: 4,
						slidesToScroll: 1,
						speed: 500,
						infinite: true,
						prevArrow: '<button type="button" class="slick-prev"><span><svg viewBox="0 0 15 24.5" xmlns="http://www.w3.org/2000/svg"><path class="svg_arrow" d="m14.977888,21.40658l-9.169999,-9.169998l9.169999,-9.17l-2.829999,-2.83l-12,12l12,12l2.829999,-2.830002z"/><path stroke="null" id="svg_2" fill="none" d="m0.148682,0.044084l14.689654,0l0,23.974919l-14.689654,0l0,-23.974919z"/></svg></button>',
						nextArrow: '<button type="button" class="slick-next"><span><svg viewBox="0 0 15 24.5" xmlns="http://www.w3.org/2000/svg"><path class="svg_arrow" d="m0.124967,21.370632l9.17,-9.170002l-9.17,-9.17l2.83,-2.83l12,12l-12,12l-2.83,-2.829998z"/><path stroke="null" id="svg_2" fill="none" d="m7.473229,5.411077l14.913806,0l0,23.846835l-14.913806,0l0,-23.846835z"/></svg></span></button>'
					});
				} else {
					slider.slick({
						arrows: false,
						slidesToShow: 4,
						slidesToScroll: 1,
						speed: 500,
						infinite: true,
					});

					$('.' + nameClass + ' .slide__prev').on('click', function(){
						slider.slick('slickPrev');
					});
			
					$('.' + nameClass + ' .slide__next').on('click', function(){
						slider.slick('slickNext');
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
				reset = $(this).find('.reset__filter');

			multi.multipleSelect({
				single: true
			});

			// reset.on('click', function(){
			// 	var drop = $(this).parents('.cont').find('.ms-drop').find('li:first-of-type').find('input');
				
			// 	multi.multipleSelect('uncheckAll');
			// 	//multi.multipleSelect('setSelects', [2]);
			// 	setTimeout(function(){
			// 		drop.trigger('click');
			// 	},100)
				
			// 	multi.multipleSelect('refresh');

			// 	return false;
			// });

		});
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
		$('.slider-for').slick({
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 500,
			infinite: true,
			asNavFor: '.slider-nav',
			fade: true
		});
		$('.slider-nav').slick({
			arrows: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			speed: 500,
			infinite: true,
			asNavFor: '.slider-for',
			focusOnSelect: true
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

});
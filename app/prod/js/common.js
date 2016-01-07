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
				if(parent.hasClass('news')){
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
			};				

			link_cont.on('click', function(){
				var this_ = $(this),
					index = this_.data('href');

				this_.parents('.tab__content').find('.' + index).fadeIn(0).siblings().fadeOut(0);
				this_.parents('.tab__container').find('a[data-href=' + index + ']').parent().addClass('active').siblings().removeClass('active');
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
					slider.slick();

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
			});
		});
	})();

});
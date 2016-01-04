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
				tab_item.fadeOut(0);				
				if(parent.hasClass('news')){
					parent.find("."+index).fadeIn(300).find('.sliders').slick('setPosition');
				} else {
					parent.find("."+index).fadeIn(300);
				}
				return false;
			});
			
			linkItem.first().addClass('active');
			parent.find("."+index).show();

			link_cont.on('click', function(){
				var this_ = $(this),
					index = this_.data('href');

				this_.parents('.tab__content').find('.' + index).fadeIn(300).siblings().fadeOut(0);
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

				console.log(slider)

				if($('.' + nameClass).hasClass('slider')) {
					slider.slick({
						arrows: false,
						slidesToShow: 4,
						slidesToScroll: 1,
						speed: 500,
						infinite: true
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


});
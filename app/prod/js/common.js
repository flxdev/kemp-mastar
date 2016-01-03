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

});
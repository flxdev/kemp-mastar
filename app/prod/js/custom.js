$(document).ready(function(){
	function ProductAccordeon (){
		var trigger = $('.js-products-btn'),
			clas = 'open';
		trigger.each(function(){
			var _ = $(this),
				text = _.data('text'),
				target = _.parent().find('.add-products-table');

			_.on('click',function(){
				toggleText(_)
				target.add(_).toggleClass(clas);
			})
		})
	}ProductAccordeon ();
	function toggleText(item) {
    	var altText = item.data("text");

    	if (altText) {
    		item.data("text", item.text());
    		item.text(altText);
    	
    	}
    };
});
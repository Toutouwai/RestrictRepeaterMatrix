function checkRepeaterMatrix(inputfield_class, matrix_type, limit) {

	// All arguments are required
	if( !(inputfield_class && matrix_type && limit) ) return;

	// Get repeater items of this matrix type
	var $repeater_items = $(inputfield_class + ' .InputfieldRepeaterItem[data-type="' + matrix_type + '"]').not('.InputfieldRepeaterNewItem');

	// Check if add-links should be hidden or shown
	var $add_link = $(inputfield_class + ' > div > .InputfieldRepeaterMatrixAddItem .InputfieldRepeaterMatrixAddLink[data-type="' + matrix_type + '"]');
	if(limit === 0 || $repeater_items.length > limit - 1) {
		$add_link.removeClass('rrm-show');
	} else {
		$add_link.addClass('rrm-show');
	}

	// Hide add-items container if no visible child links
	var $add_items = $(inputfield_class + ' > div > .InputfieldRepeaterMatrixAddItem');
	$add_items.show();
	var $add_links = $add_items.find('a');
	var $hidden_add_links = $add_links.filter(function() {
		return $(this).css('display') === 'none';
	});
	if($add_links.length === $hidden_add_links.length) {
		$add_items.hide();
	}

}

function checkRepeaterMatrix(inputfield_class, matrix_type, limit, limit_clone) {

	// All arguments are required
	if(!(inputfield_class && matrix_type && limit)) return;

	// Inputfield
	var $inputfield = $(inputfield_class);
	
	// Add type
	var add_type = $inputfield.data('add-type');

	// Inputfield content
	var $inputfield_content = $inputfield.find('> .InputfieldContent');

	// Repeater items of this matrix type
	var $repeater_items = $inputfield_content.find('> .Inputfields > .InputfieldRepeaterItem[data-type="' + matrix_type + '"]').not('.InputfieldRepeaterNewItem');

	// Repeater items not of this matrix type
	var $other_repeater_items = $inputfield_content.find('> .Inputfields > .InputfieldRepeaterItem[data-type!="' + matrix_type + '"]').not('.InputfieldRepeaterNewItem');

	// Insert select
	var $insert_select = $inputfield_content.find('> .InputfieldRepeaterMatrixAddItem > .InputfieldRepeaterMatrixAddSelectWrap > .InputfieldRepeaterMatrixAddSelect');

	// Image links container
	var $image_links_container = $inputfield_content.find('> .InputfieldRepeaterMatrixAddCustom');

	// Check if limit has been reached
	var $add_link = $inputfield_content.find('> .InputfieldRepeaterMatrixAddItem .InputfieldRepeaterMatrixAddLink[data-type="' + matrix_type + '"]');
	var $settings_option = $other_repeater_items.find('> .InputfieldContent > .Inputfields > .InputfieldSelect select[id^=Inputfield_type_repeater] option[value=' + matrix_type + ']');
	var $insert_option = $insert_select.find('option[value$="_add_' + matrix_type + '"]');
	var $image_link = $image_links_container.find('a[href$="_add_' + matrix_type + '"]');
	if($repeater_items.length >= limit) {
		if(limit_clone) $repeater_items.find('> .InputfieldHeader .InputfieldRepeaterClone').hide();
		if(add_type === 1) $add_link.removeClass('rrm-show');
		$settings_option.hide()
		$insert_option.hide()
		$image_link.hide()
	} else {
		if(limit_clone) $repeater_items.find('> .InputfieldHeader .InputfieldRepeaterClone').show();
		if(add_type === 1) $add_link.addClass('rrm-show');
		$settings_option.show()
		$insert_option.show()
		$image_link.show()
	}

	// Hide add-items prompt and insert buttons if no matrix types can be added
	var $insert_buttons = $inputfield_content.find('> .Inputfields > .InputfieldRepeaterItem > .InputfieldHeader').find('.InputfieldRepeaterInsertAfter, .InputfieldRepeaterInsertBefore');
	$insert_buttons.show();
	var $add_items_container;
	var $add_items_prompt;
	var $add_items;
	switch(add_type) {
		case 0:
			$add_items_container = $inputfield_content.find('> .InputfieldRepeaterMatrixAddItem');
			$add_items_prompt = $add_items_container;
			$add_items = $add_items_container.find('option:not([value=""])');
			break;
		case 2:
		case 3:
			$add_items_container = $image_links_container;
			$add_items_prompt = $inputfield_content.find('> .InputfieldRepeaterMatrixCustomAddLink');
			$add_items = $add_items_container.find('a');
			break;
		default: // i.e. 1
			$add_items_container = $inputfield_content.find('> .InputfieldRepeaterMatrixAddItem');
			$add_items_prompt = $add_items_container;
			$add_items = $add_items_container.find('a');
	}
	$add_items_prompt.show();
	var $hidden_add_items = $add_items.filter(function() {
		return $(this).css('display') === 'none';
	});
	if($add_items.length === $hidden_add_items.length) {
		$add_items_prompt.hide();
		$insert_buttons.hide();
	}

}

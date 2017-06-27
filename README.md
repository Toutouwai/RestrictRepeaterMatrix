# Restrict Repeater Matrix

A module for ProcessWire CMS/CMF. Allows restrictions and limits to be placed on Repeater Matrix fields.

For any matrix type in a Repeater Matrix field you have the option to:

* Prevent drag-sorting of items
* Prevent cloning of items
* Prevent toggling of the published state of items
* Prevent trashing of items
* Limit the number of items that may be added to the inputfield

## Usage

[Install](http://modules.processwire.com/install-uninstall/) the Restrict Repeater Matrix module.

For each matrix type created in the Repeater Matrix field settings, a "Restrictions" fieldset is added at the bottom of the matrix type settings:

![2017-06-26_213521](https://user-images.githubusercontent.com/1538852/27533375-70133e02-5ab7-11e7-8af1-1fabd91b9f7f.png)

For newly added matrix types, the settings must be saved first in order for the Restrictions fieldset to appear. Set restrictions for each matrix type as needed. A limit of zero means that no items of that matrix type may be added to the inputfield.

### Setting restrictions via a hook

Besides setting restrictions in the field settings, you can also apply or modify restrictions by hooking `RestrictRepeaterMatrix::checkRestrictions`. This allows for more focused restrictions, for example, applying restrictions depending on the template of the page being edited or depending on the role of the user.

The `checkRestrictions()` method receives the following arguments:

* `$field` This Repeater Matrix field
* `$inputfield` This Repeater Matrix inputfield
* `$matrix_types` An array of matrix types for this field. Each key is the matrix type name and the value is the matrix type integer.
* `$page` The page that is open in ProcessPageEdit

The method returns a multi-dimensional array of matrix types and restrictions for each of those types. An example of a returned array:

![2017-06-26_220809](https://user-images.githubusercontent.com/1538852/27534705-0c306d9c-5abc-11e7-9689-6099ac253b4b.png)

#### Example hooks

Prevent the matrix type "images_block" from being added to "my_matrix_field" in a page with the "basic-page" template:

```php
$wire->addHookAfter('RestrictRepeaterMatrix::checkRestrictions', function(HookEvent $event) {
    $field = $event->arguments('field');
    $page = $event->arguments('page');
    $type_restrictions = $event->return;
    if($field->name === 'my_matrix_field' && $page->template->name === 'basic-page') {
        $type_restrictions['images_block']['limit'] = 0;
    }
    $event->return = $type_restrictions;
});
```

Prevent non-superusers from trashing any Repeater Matrix items in "my_matrix_field":

```php
$wire->addHookAfter('RestrictRepeaterMatrix::checkRestrictions', function(HookEvent $event) {
    $field = $event->arguments('field');
    $type_restrictions = $event->return;
    if($field->name === 'my_matrix_field' && !$this->user->isSuperuser()) {
        foreach($type_restrictions as $key => $value) {
            $type_restrictions[$key]['notrash'] = true;
        }
    }
    $event->return = $type_restrictions;
});
```


## License

Released under Mozilla Public License v2. See file LICENSE for details.

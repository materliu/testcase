/**
 * User: mater(materliu@gmail.com)
 * Date: 5/14/14
 * Time: 7:40 PM
 */

(function() {
    'use strict';

    function init() {
        var formOrder = document.forms.order,
            saveButton = document.getElementById('save-button'),
            saveButtonClicked;

        function saveForm() {

            if (!'formaction' in document.createElement('input')) {
                var formAction = saveButton.getAttribute('formaction');
                formOrder.setAttribute('action', formAction);
            }
            saveButtonClicked = true;
        }

        saveButton.addEventListener('click', saveForm, false);

    }

    window.addEventListener('load', init, false);
})();

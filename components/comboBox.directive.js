angular
    .module('components')
    .directive('comboBox', comboBox);

// TODO add scroll bar for overflow on dropdown contents (i.e., if list length is longer than display length)
comboBox.$inject = ['$timeout'];
function comboBox($timeout) {
    'use strict';

    var directive = {
        restrict: 'EA',
        scope: {
            displayLimit: '@',
            items: '=',
            label: '@',
            onSelected: '=?',
            value: '@'
        },
        templateUrl: 'components/comboBox.tpl.html',
        controller: ComboBoxCtrl,
        controllerAs: 'comboBoxCtrl',
        bindToController: true,
        link: linkFn
    };

    return directive;

    function linkFn(scope, iElement, iAttrs) {
        var comboBoxCtrl = scope.comboBoxCtrl,
            dropdown,
            dropdownBtn,
            focusIndex = 0;

        comboBoxCtrl.onChange = onChange;
        
        // Activate inside a $timeout so activation happens after ng-repeat compilation
        $timeout(activate);

        ///////////////////////

        function activate() {
            dropdown = angular.element(iElement[0].querySelector('#dropdown'));
            dropdownBtn = iElement[0].querySelector('#dropdown-btn');
            attachEventsToLinks();
            calcHeight();
            iElement.on('keydown', handleKeyDown);
        }
        
        function calcHeight() {
            // TODO: is this causing the scrollbar to appear on smaller screen?
            var comboBoxList = iElement[0].querySelector('#combobox-list'),
                comboBoxListAng = angular.element(comboBoxList),
                listItemHeight,
                height;
            // Make the combobox displayed but off screen to get the item height (otherwise the height is 0)
            comboBoxListAng.addClass('combobox-hidden');
            listItemHeight = comboBoxListAng.children()[0].clientHeight;
            comboBoxListAng.removeClass('combobox-hidden');
            // Height = total height of list items + padding (5px * 2) + border (1px * 2)
            height = listItemHeight * comboBoxCtrl.displayLimit + 12;
            comboBoxList.style.height = height.toString() + 'px';
        }
        
        function handleKeyDown(e) {
            // TODO: make this function as small as possible
            var char = String.fromCharCode(e.which);
            if (e.which === 9) {
                // Open dropdown on tab
                if (!dropdown.hasClass('open')) { 
                    dropdownBtn.click(); 
                    focusIndex = 0; 
                }
                else if (focusIndex === 0) {
                    var selected = iElement[0].querySelector('#link-item-0');
                    selected.focus();
                    ++focusIndex
                }
                else {
                    ++focusIndex;
                }
            }
            else if ((e.which === 38 || e.which === 40) && dropdown.hasClass('open')) {
                // Focus line item on arrow key press
                var selected = iElement[0].querySelector('#link-item-' + focusIndex);
                selected.focus();
                if (e.which === 38 && focusIndex > 0) { --focusIndex; }
                if (e.which === 40 && focusIndex < comboBoxCtrl.listSource.length - 1) { ++focusIndex; }
            }
            else if (e.which === '13' && dropdown.hasClass('open')) {
                // Close dropdown on enter
                dropdown.removeClass('open');
            }
        }

        function attachEventsToLinks() {
            for (var i = 0; i < comboBoxCtrl.listSource.length; i++) {
                attachEvent(i);
            }
        }

        function attachEvent(index) {
            var link = iElement[0].querySelector('#link-item-' + index);
            link = angular.element(link);
            // TODO: there seems to be a bug where the handlers below don't get registered for certain items
            // Need to use 'on' here because the focus event is coming from Bootstrap/jQuery
            // (otherwise we would use ng-focus)
            link.on('focus', updateInputVal);
            // TODO: put this in ng-click?
            link.on('click', updateInputVal);
        }

        function updateInputVal(event) {
            event.preventDefault();
            // Reset focus index if needed and update the value of the input box.
            $timeout(function () {
                // Do inside $timeout to update matchAgainst after current digest
                if (event.type === 'click') { focusIndex = 0; }
                comboBoxCtrl.matchAgainst = angular.element(event.target).text();
            });
        };
        
        function findMatches() {
            focusIndex = 0;
            comboBoxCtrl.listSource = comboBoxCtrl.items.filter(function (item) {
                return (new RegExp(comboBoxCtrl.matchAgainst || char, "i")).test(item[comboBoxCtrl.label]);
            });
            $timeout(attachEventsToLinks);
        }

        function onChange() {
            // Open dropdown list when input is entered
            // and close it when input is cleared
            if (comboBoxCtrl.matchAgainst !== '') {
                if (!dropdown.hasClass('open')) { dropdown.addClass('open'); }
                // Filter results
                findMatches();
            }
            else if (comboBoxCtrl.matchAgainst === '') {
                dropdown.removeClass('open');
                comboBoxCtrl.listSource = comboBoxCtrl.items;
            }
        }
    }
}

function ComboBoxCtrl() {
    var comboBoxCtrl = this;

    comboBoxCtrl.displayLimit = parseInt(comboBoxCtrl.displayLimit, 10) || 4;
    comboBoxCtrl.label = comboBoxCtrl.label || '';
    comboBoxCtrl.listSource = comboBoxCtrl.items;/*.slice(0, comboBoxCtrl.displayLimit);*/
    comboBoxCtrl.matchAgainst = '';
    comboBoxCtrl.onSelected = comboBoxCtrl.onSelected || angular.noop;
    comboBoxCtrl.value = comboBoxCtrl.value || '';

    activate();

    ///////////////////////////

    function activate() {
        if (comboBoxCtrl.label === '') {
            console.error(comboBoxCtrl);
            throw new Error('No label property specified for comboBox.');
        }
    }
}

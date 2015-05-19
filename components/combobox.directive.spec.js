describe('comboBox directive', function () {
    'use strict';

    var element, scope, isolateScope, comboBoxCtrl, compile;

    beforeEach(module('components'));

    beforeEach(module('templates'));

    beforeEach(inject(function($rootScope, $compile) {
        compile = $compile;
        scope = $rootScope.$new();

        scope.items = [
            {
                id: '1',
                desc: 'Test1'
            },
            {
                id: '2',
                desc: 'Test2'
            }
        ];

        element = angular.element('<combo-box items="items" label="desc" value="id"></combo-box>');

        element = $compile(element)(scope);
        scope.$digest();
        isolateScope = element.children().scope();
        comboBoxCtrl = isolateScope.comboBoxCtrl;
    }));

    it('should throw an error if no label given', function () {
        var invokeElementNoLabel = function () {
            scope.items = [
                {
                    id: '1',
                    desc: 'Test1'
                },
                {
                    id: '2',
                    desc: 'Test2'
                }
            ];
            element = angular.element('<combo-box items="items" label="" value="id"></combo-box>');
            element = compile(element)(scope);
            scope.$digest();
        };

        expect(invokeElementNoLabel).toThrowError('No label property specified for comboBox');
    });

    it('should use the input group class', function () {
        expect(element.html()).toContain('input-group');
    });

    it('should accept and define items, label, and value props', function () {
        expect(comboBoxCtrl.items).toBeDefined();
        expect(comboBoxCtrl.label).toBeDefined();
        expect(comboBoxCtrl.value).toBeDefined();
    });

    it('should define listSource', function () {
        expect(comboBoxCtrl.listSource).toBeDefined();
    });

});

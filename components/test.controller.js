angular
    .module('components')
    .controller('testCtrl', TestCtrl);

function TestCtrl() {
    var vm = this;

    vm.destinations = [
        {
            id: '1',
            desc: 'Store 50',
            trunking: 'No'
        },
        {
            id: '2',
            desc: 'DC 6094',
            trunking: 'Yes'
        },
        {
            id: '3',
            desc: 'DC 100',
            trunking: 'No'
        },
        {
            id: '4',
            desc: 'Store 3096',
            trunking: 'No'
        },
        {
            id: '1',
            desc: 'Store 51',
            trunking: 'No'
        },
        {
            id: '2',
            desc: 'DC 6095',
            trunking: 'Yes'
        },
        {
            id: '3',
            desc: 'DC 101',
            trunking: 'No'
        },
        {
            id: '4',
            desc: 'Store 3097',
            trunking: 'No'
        },
        {
            id: '1',
            desc: 'Store 52',
            trunking: 'No'
        },
        {
            id: '2',
            desc: 'DC 6096',
            trunking: 'Yes'
        },
        {
            id: '3',
            desc: 'DC 102',
            trunking: 'No'
        },
        {
            id: '4',
            desc: 'Store 3098',
            trunking: 'No'
        },
        {
            id: '1',
            desc: 'Store 53',
            trunking: 'No'
        },
        {
            id: '2',
            desc: 'DC 6097',
            trunking: 'Yes'
        },
        {
            id: '3',
            desc: 'DC 103',
            trunking: 'No'
        },
        {
            id: '4',
            desc: 'Store 3099',
            trunking: 'No'
        }
    ];
}

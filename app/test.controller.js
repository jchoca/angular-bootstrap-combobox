angular
    .module('components')
    .controller('testCtrl', TestCtrl);

function TestCtrl() {
    var vm = this;
    
    vm.items = [];
    for (var i = 0; i < 101; ++i) {
        vm.items.push({
            id: i.toString(),
            desc: Math.round(Math.random()*100000000).toString()
        })
    }
}

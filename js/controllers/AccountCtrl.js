import subModule from './submodule'

export default subModule.controller('AccountCtrl', function($scope) {
    
    $scope.settings = {
        enableFriends: true
    };
});
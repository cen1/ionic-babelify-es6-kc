import subModule from './submodule'

export default subModule.controller('DashCtrl', function($rootScope, $scope, Auth) {
    
    $scope.user = Auth.tokenParsed.name;
});
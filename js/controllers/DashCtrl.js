import subModule from './submodule'

export default subModule.controller('DashCtrl', function($rootScope, $scope) {
    
    $scope.user = $rootScope.keycloak.tokenParsed.name;
});
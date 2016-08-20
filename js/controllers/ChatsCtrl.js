import subModule from './submodule'

export default subModule.controller('ChatsCtrl', function($scope, ChatsRest) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.$on('$ionicView.enter', (e) => {

        console.log("Entered chats ctrl");
        
        ChatsRest.getAll().then((response) => {
            console.log("REST call success");
            console.log(response);
            $scope.chats=response.data;
        }).catch((error) => {
            console.log("Error with REST call: ");
            console.log(error);
        });
    });
});
import subModule from './submodule'

export default subModule.controller('ChatDetailCtrl', function($scope, $stateParams, ChatsRest) {

    $scope.$on('$ionicView.enter', (e) => {

        console.log("Entered chatsDetail ctrl");
        
        ChatsRest.get($stateParams.chatId).then((response) => {
            console.log("REST call success");
            console.log(response);
            $scope.chat=response.data;
        }).catch((error) => {
            console.log("Error with REST call: ");
            console.log(error);
        });
    });
});
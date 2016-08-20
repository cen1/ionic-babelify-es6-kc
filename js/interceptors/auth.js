import subModule from './submodule'

export default subModule.factory('authInterceptor', ($rootScope, $q) => {

    return {
        request(config) {
            let deferred = $q.defer();

            if ($rootScope.keycloak.token) {
                
                $rootScope.keycloak.updateToken(30).success(() => {

                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + $rootScope.keycloak.token;
                    deferred.resolve(config);
                }).error(() => {
                    deferred.reject({status: 401});
                });
            } else {
                deferred.resolve(config);
            }
            return deferred.promise;
        }
    };
});
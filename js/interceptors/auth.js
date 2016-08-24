import subModule from './submodule'

export default subModule.factory('authInterceptor', ($q, Auth) => {

    return {
        request(config) {
            let deferred = $q.defer();

            if (Auth.token) {
                
                Auth.updateToken(30).success(() => {

                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + Auth.token;
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
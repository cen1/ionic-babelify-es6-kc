import config from '../config';
import subModule from './submodule'

export default subModule.factory('ChatsRest', ($http) => {

    const source = '/chats';
    const api = config.config.api;

    return {
        get(id) {
            return $http.get(api+source+"/"+id);
        },
        getAll() {
            return $http.get(api+source);
        }
    }
});
import subModule from './submodule'

export default subModule.factory('Auth', () => {
    return window.keycloak;
});
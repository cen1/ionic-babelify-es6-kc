import controllers from './controllers';
import interceptors from './interceptors';
import rest from './rest';
import Auth from './auth';
import states from './states/states';
import Keycloak from 'keycloak-js';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.rest', 'starter.interceptors', 'starter.auth'])

.run(function($rootScope, $state, $ionicPlatform, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    console.log("Ionic init");

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //Kc auth state listener
    $rootScope.$on('$stateChangeStart', (event, toState) => {

        if (toState.requiresAuth) {
            console.log("State requires authentication");
            if (Auth.authenticated) {
                console.log("Client already authenticated");
                if (toState.requiredRoles && toState.requiredRoles
                        .filter((role) => auth.keycloak.realmAccess.roles.indexOf(role) == -1).length > 0) {

                    $rootScope.$broadcast('noAuthorization');
                    event.preventDefault();
                }
            } else {
                console.log("Client needs to authenticate");
                $rootScope.$broadcast('noAuthentication', $state.href(toState.name, toState.params, {absolute: true}));
                event.preventDefault();
            }
        }
    });

    $rootScope.$on('noAuthentication',(event, url) => {
        Auth.login({redirectUri: url});
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('authInterceptor');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  states($stateProvider);

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

angular.element(document).ready(() => {
  console.log("Angular init");

  let initKc = () => {
      window.keycloak = new Keycloak();
      window.keycloak.init({ onLoad: 'login-required'}).success(() => { 
            console.log("Keycloak init success");
            angular.bootstrap(document.body, ['starter']);
      }).error((error) => {
          console.log("Kc init error");
          console.log(error);
      });
  };

  if (window.cordova) {
      console.log("cordova detected");

      document.addEventListener('deviceready', () => {
          console.log("Deviceready event has fired, bootstrapping AngularJS.");
          initKc();
      }, false);
  }
  else {
      console.log("browser detected");
      initKc();
  }  
});
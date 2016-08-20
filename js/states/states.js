export default ($stateProvider) => {
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        requiresAuth: true
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
        'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
        }
        },
        requiresAuth: true
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
            }
        },
        requiresAuth: true
        })
        .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
            'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
            }
        },
        requiresAuth: true
        })

    .state('tab.account', {
        url: '/account',
        views: {
        'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
        },
        requiresAuth: true
        }
    });
}
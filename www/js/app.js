// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    
  .state('tab.arrastrado', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-arrastrado.html',
          controller: 'TanteoArrastrado'
        }
      }
    })



  .state('tab.local', {
    url: '/local',
    views: {
      'tab-local': {
        templateUrl: 'templates/tab-local.html',
        controller: 'LocalCtrl'
      }
    }
  })
  

  .state('tab.jugadorL', {
    url: '/local/:idJugador',
    views: {
      'tab-local': {
        templateUrl: 'templates/tab-jugadorL.html',
        controller: 'DatosJugadorL'
      }
    }
  })



  .state('tab.visitante', {
    url: '/visitante',
    views: {
      'tab-visitante': {
        templateUrl: 'templates/tab-visitante.html',
        controller: 'VisitanteCtrl'
      }
    }
  })

  .state('tab.jugadorV', {
    url: '/visitante/:idJugador',
    views: {
      'tab-visitante': {
        templateUrl: 'templates/tab-jugadorV.html',
        controller: 'DatosJugadorV'
      }
    }
  })


  .state('tab.seleccion', {
    url: '/dash/:EquipoPuntos',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-seleccion.html',
        controller: 'seleccionCtrl'
      }
    }
  })



  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

(function () {
    'use strict';

    app.routes.$inject = ['$stateProvider', '$urlRouterProvider'];
    
    app.routes.config(function($stateProvider, $urlRouterProvider) {
        
        // Catch-all default path
        $urlRouterProvider.otherwise('/');
        
        // Routes/States
        $stateProvider  
            // Example Empty Route
            // .state('/', {
            //     url: '/',
            //     templateUrl: '',
            //     controller: '',
            //     controllerAs: 'vm'
            // })
       .state('/', {
          url: '/',
          templateUrl: 'views/error-pages/404.html',
          controller: 'error404Controller',
          controllerAs: 'vm'
       })     
            
    });
    
})();
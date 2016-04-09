// Core App Module
var app = angular.module('app', [
    // Core Angular Modules
     'ngMessages', 'ngAnimate', 'ngSanitize', 'ngAria',
    
    // Services
    'app.svc',
    
    // Factories
    'app.fac',
    
    // Controllers
    'app.ctrl',
    
    // Directives
    'app.drv',
    
    // Routes
    'app.routes'
]);

// Services Module
app.svc = angular.module('app.svc', ['ngResource']);

// Factories Module
app.fac = angular.module('app.fac', []);

// Controllers Module
app.ctrl = angular.module('app.ctrl', []);

// Directives Module
app.drv = angular.module('app.drv', []);

// Routes Module
app.routes = angular.module('app.routes', ['ui.router']);


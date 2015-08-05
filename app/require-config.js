'use strict';

require.config({
    paths: {
        'text': '../node_modules/text/text',
        angular: '../node_modules/angular/angular',
        angularAnimate: '../node_modules/angular-animate/angular-animate',
        uiRouter: '../node_modules/angular-ui-router/release/angular-ui-router',
        Parse: '../node_modules/parse/build/parse-latest'
    },
    shim: {
        'angular': {
          'exports': 'angular'
        },
        'uiRouter': {
            deps: ['angular']
        },
        'angularAnimate': {
            deps: ['angular']
        },
        'Parse': {
          'exports': 'Parse'
        },
    },
    priority: ['angular'],
    deps: ['angular', 'angular-bootstrap']
});

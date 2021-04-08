(function () {
    'use strict';

    angular.module('informer')
        .config(function (appTitle, navProvider) {
            $('body').addClass('white-label');

        })
        .run(function ($rootScope, logLevels, appTitle) {
            $rootScope.hideHelp = true;
            $rootScope.whiteLabel = true;
        });
})();

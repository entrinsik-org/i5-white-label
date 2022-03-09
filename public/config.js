(function () {
    'use strict';

    angular.module('informer')
        .config(function (navProvider) {
            $('body').addClass('white-label');

        })
        .run(function ($rootScope, logLevels) {
            $rootScope.hideHelp = true;
            $rootScope.whiteLabel = true;
        });
})();

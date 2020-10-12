(function () {
    'use strict';

    angular.module('informer')
        .config(function (appTitle, navProvider) {

            appTitle.short = 'ACME';
            appTitle.full = 'ACME Reporting';

            // Override descriptions in the top nav states
            _.set(navProvider, ['statesById', 'user', 'description'], appTitle.short + ' members who have a profile and may log in.');
            _.set(navProvider, ['statesById', 'admin-settings', 'description'], 'Manage top level ' + appTitle.short + ' system options');
            _.set(navProvider, ['statesById', 'admin-license', 'description'], 'View and update your current ' + appTitle.short + ' license');
            _.set(navProvider, ['statesById', 'admin-features', 'description'], 'Turn on and off ' + appTitle.short + ' system features');
            _.set(navProvider, ['statesById', 'admin-tenants', 'description'], 'Add, remove, and modify child ' + appTitle.short + ' instances');
            _.set(navProvider, ['statesById', 'admin-tokens', 'description'], 'Create, remove, and modify API Tokens for external access to ' + appTitle.short);
            _.set(navProvider, ['statesById', 'dataset-discover', 'description'], appTitle.short + '\'s take on your data');
            _.set(navProvider, ['statesById', 'home-welcome', 'description'], 'See all the different places you have acceess to in ' + appTitle.short);
            _.set(navProvider, ['statesById', 'team-members', 'description'], appTitle.short + ' users who belong to this Team');

            $('body').addClass('white-label');

        })
        .run(function ($rootScope, logLevels, appTitle) {
            $rootScope.hideHelp = true;
            $rootScope.whiteLabel = true;
            logLevels.error.description = 'Log when an error occurs in ' + appTitle.short + ', which usually prevents an action from completing.';
            logLevels.warn.description = 'Log when something unexpected happens, but ' + appTitle.short + ' can handle it.';
        });
})();

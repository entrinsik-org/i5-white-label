'use strict';

const path = require('path');

exports.register = function (server, opts, next) {

    const bundle = server.bundle('white-label').scan(__dirname, 'public');
    server.injector().inject(bundle);

    server.select('content').route({
        method: 'GET',
        path: '/assets/white-label/images/{path*}',
        config: {
            auth: false,
            handler: {
                directory: {
                    path: path.resolve(__dirname, './public/images'),
                    listing: false,
                    index: false
                }
            }
        }
    });

    server.route({
        path: '/login.html',
        method: 'get',
        config: {
            auth: false,
            handler: {
                file: path.resolve(__dirname, 'assets/login.html')
            }
        }
    });

    server.route({
        path: '/images/informer.svg',
        method: 'get',
        config: {
            auth: false,
            handler: {
                file: path.resolve(__dirname, 'public/images/logo.svg')
            }
        }
    });

    //Override Informer's favicon directory
    // Use https://realfavicongenerator.net/ to create a favicon directory with your logo
    server.route({
        method: 'GET',
        path: '/images/favicon/{path*}',
        config: {
            auth: false,
            handler: {
                directory: {
                    path: path.resolve(__dirname, './public/images/favicon'),
                    listing: false,
                    index: false
                }
            }
        }
    });

    next();
};

exports.register.attributes = { name: 'inf-white-label' };
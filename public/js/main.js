require.config({
    paths: {
        jQuery: './libs/jquery/dist/jquery',
        jQueryUi: './libs/jqueryui/jquery-ui',
        Underscore: './libs/underscore/underscore',
        Backbone: './libs/backbone/backbone',
        D3: './libs/D3/D3',
        views: './views',
        models: './models',
        collections: './collections',
        text: './libs/text/text',
        templates: '../templates'
    },
    shim: {
        'jQueryUi': ['jQuery'],
        'Backbone': ['Underscore', 'jQueryUi'],
        'app': ['Backbone']
    }
});

require(['app'], function(app){
    app.init();
});
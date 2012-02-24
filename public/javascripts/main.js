require.config({
    paths: {
        jquery:                       'libs/jquery/jquery',
        'jquery-ui':                  'libs/jquery/jquery-ui',
        underscore:                   'libs/underscore/underscore',
        backbone:                     'libs/backbone/backbone',
        text:                         'libs/require/text',
        Handlebars:                   'libs/handlebars/handlebars',
        'Handlebars/i18nprecompile': 'libs/handlebars/i18nprecompile',
        hbs:                          'libs/handlebars/hbs',
        json2:                        'libs/json/json2',
        template:                    '../templates'
    }

});

require(['app'], function(app) {
    app.initialize();
});

({
    appDir : '../',
    baseUrl : 'js',
    dir : '../../release',
    paths: {
        jquery:         'libs/jquery/jquery',
        'jquery-ui':    'libs/jquery/jquery-ui',
        underscore:     'libs/underscore/underscore',
        backbone:       'libs/backbone/backbone',
        handlebars:     'libs/handlebars/handlebars-1.0.0.beta.6',
        text:           'libs/require/text',
        json2:          'libs/json/json2',
        templates:      '../templates'
    },
    optimize: 'uglify',
    modules: [
        {
            name: 'main',
            exclude: ['jquery', 'jquery-ui', 'underscore', 'backbone', 'handlebars', 'text', 'json2']
        }
    ]
})

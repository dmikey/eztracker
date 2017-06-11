var grapnel = require('grapnel');
var $ = require('zepto');
var router = new grapnel();
var dispatcher = require('store');

// login
$(function() {
    var view = require('../views/default');
    view.appendTo('#app');

    //setup routes for app
    router.get('', function(req){
        // default
        
    });
})
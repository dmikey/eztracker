var Lawnchair = require('lawnchair');
var Dispatcher = require('flux').Dispatcher;
var actions = require('./actions');

var storeDispatcher = new Dispatcher();
var waterStore = new Lawnchair({adaptor:'dom', table:'water'});
var weightStore = new Lawnchair({adaptor:'dom', table:'weight'});
var caloriesStore = new Lawnchair({adaptor:'dom', table:'calories'});
var activityStore = new Lawnchair({adaptor:'dom', table:'activity'});
var currentMetric;

var storeReciever = storeDispatcher.register(function(payload) {
    switch(payload.actionType) {
    
        case 'SET_METRIC':
            currentMetric = payload.metric;
           
        break;
        
        case 'ADD_ENTRY':
            var value = parseInt(payload.value);
            if(value > 0) {
            
                console.log('adding entry');            
            }
       
        break;
    }
});

module.exports = storeDispatcher;
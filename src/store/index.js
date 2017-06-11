var Lawnchair = require('lawnchair');
var Dispatcher = require('flux').Dispatcher;
var actions = require('./actions');

var storeDispatcher = new Dispatcher();
var store = new Lawnchair()
var currentMetric;
var values = {};

var storeReciever = storeDispatcher.register(function(payload) {
    switch(payload.actionType) {
        
        case 'INIT':
            
            store.get('weight', function(record) {
                values.weight = record;
            });
            
            store.get('water', function(record) {
                values.water = record;
            });
            
            store.get('activity', function(record) {
                values.activity = record;
            });
            
            store.get('calories', function(record) {
                values.calories = record;
            });
            
            setTimeout(function(){
                storeDispatcher.dispatch({actionType:'UI_UPDATE', values: values})            
            })

        break;
    
        case 'SET_METRIC':
            currentMetric = payload.metric;
        break;
        
        case 'ADD_ENTRY':
            var value = parseInt(payload.value);
            if(value > 0) {
                
                var record = {list:[]};
                store.get(currentMetric, function(ret) {
                    if(ret) record = ret;
                });
                
                if(currentMetric != 'weight') {
                    var amt = values[currentMetric] && values[currentMetric].amt || 0;
                    value = amt + value; 
                }
                
                if(record) {
                    if(record.list) {
                        record.list.push(value)
                    }               
                }
                
                values[currentMetric] = {amt: value, metric: currentMetric, time: new Date(), list:record.list};
                store.save({key:currentMetric, amt: value, metric: currentMetric, time: new Date(), list:record.list});
            }
            
            setTimeout(function(){
                storeDispatcher.dispatch({actionType:'UI_UPDATE', values: values})            
            })
            
       
        break;
    }
});

module.exports = storeDispatcher;
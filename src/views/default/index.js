// require styles
require('./style.less');
require('components/modal')

// get zepto
var $ = require('zepto');
var view = $(require('./template.html'));
var store = require('store');
var currentMetric;

var labels = {
    'weight' : 'pounds',
    'water' : 'glasses',
    'calories' : 'calories',
    'activity' : 'minutes'
}

function toggleBlur() {
    $('.weight, .water, .activity, .calories').toggleClass('blur');
}

$('#app').on('click', '.weight', function(e){
    $('x-modal')[0].setMessage('What Is Your Current Weight?');
    toggleBlur();
    store.dispatch({actionType:'SET_METRIC', metric: 'weight'})
    currentMetric = 'weight'
    $('x-modal').show();
    $('x-modal input').focus();
})

$('#app').on('click', '.water', function(e){
    $('x-modal')[0].setMessage('How Many Glasses Did You Drink?');
    toggleBlur();
    store.dispatch({actionType:'SET_METRIC', metric: 'water'})
    currentMetric = 'water'
    $('x-modal').show();    
    $('x-modal input').focus();
})

$('#app').on('click', '.activity', function(e){
    $('x-modal')[0].setMessage('How Many Minutes Were You Active?');
    toggleBlur();
    store.dispatch({actionType:'SET_METRIC', metric: 'activity'})
    currentMetric = 'activity'
    $('x-modal').show();
    $('x-modal input').focus();
})

$('#app').on('click', '.calories', function(e){
    $('x-modal')[0].setMessage('How Many Calories Did You Consume?');
    toggleBlur();	
    currentMetric = 'calories'
    store.dispatch({actionType:'SET_METRIC', metric: 'calories'})
    $('x-modal').show();
    $('x-modal input').focus();
})

store.register(function(payload) {
    switch(payload.actionType) {
        
        case 'UI_UPDATE':
            if(payload.values.weight) $('.weight .value').text(payload.values.weight.amt)
            if(payload.values.water) $('.water .value').text(payload.values.water.amt)
            if(payload.values.activity) $('.activity .value').text(payload.values.activity.amt)
            if(payload.values.calories) $('.calories .value').text(payload.values.calories.amt)
            
        break;
    
        case 'DISMISS_MODAL':
            toggleBlur();	
        break;
    }
});

// return zepto created DOM object from template
module.exports = view;
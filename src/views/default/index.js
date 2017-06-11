// require styles
require('./style.less');
require('components/modal')

// get zepto
var $ = require('zepto');
var view = $(require('./template.html'));
var store = require('store');

function toggleBlur() {
    $('.weight, .water, .activity, .calories').toggleClass('blur');
}

$('#app').on('click', '.weight', function(e){
    $('x-modal')[0].setMessage('What Is Your Current Weight?');
    toggleBlur();
    store.dispatch({actionType:'SET_METRIC', metric: 'weight'})
    $('x-modal').show();
})

$('#app').on('click', '.water', function(e){
    $('x-modal')[0].setMessage('How Many Glasses Did You Drink?');
    toggleBlur();
    store.dispatch({actionType:'SET_METRIC', metric: 'water'})
    $('x-modal').show();
})

$('#app').on('click', '.activity', function(e){
    $('x-modal')[0].setMessage('How Many Minutes Were You Active?');
    toggleBlur();
    store.dispatch({actionType:'SET_METRIC', metric: 'activity'})
    $('x-modal').show();
})

$('#app').on('click', '.calories', function(e){
    $('x-modal')[0].setMessage('How Many Calories Did You Consume?');
    toggleBlur();	
    store.dispatch({actionType:'SET_METRIC', metric: 'calories'})
    $('x-modal').show();
})

store.register(function(payload) {
    switch(payload.actionType) {
    
        case 'DISMISS_MODAL':
            toggleBlur();	
        break;
    }
});

// return zepto created DOM object from template
module.exports = view;
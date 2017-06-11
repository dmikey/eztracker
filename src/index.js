require('styles/main.less');
require('./routes');

var store = require('store');
store.dispatch({actionType:'INIT'});
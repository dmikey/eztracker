require('document-register-element');
require('offline-plugin/runtime').install();
require('styles/main.less');
require('hamburgers/dist/hamburgers.css');
require('./routes');

var store = require('store');
store.dispatch({actionType:'INIT'});
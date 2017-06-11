require('./style.less');
var xtag = require('x-tag');
var $ = require('zepto');
var store = require('store');

module.exports = module.exports = xtag.register('x-modal', {
    content: require('./template.html'),
    lifecycle: {
        inserted: function() {
            var self = this;
            $('button', this).on('click', function(){
                var value = $('.value', self);
                self.dismiss();
                store.dispatch({actionType:'ADD_ENTRY', value: value.val()})
            })   
            $('.cancel', this).on('click', function(){
                 self.dismiss();
            })
            $(this).hide();     
        }    
    },
    methods: {
        dismiss: function(){
            $(this).hide();  
            store.dispatch({actionType:'DISMISS_MODAL'})
        },
        setMessage: function (message) {
            $('.message', this).text(message);
            $('input', this).val('');
        }
    }
});
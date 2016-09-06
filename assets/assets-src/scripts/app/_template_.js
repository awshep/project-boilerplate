
/*
* Description
*/

(function($, APP) {

    APP.NameSpace = {
        variable: '',

        initialize: function() {
            console.log("++ initialize object ++");
            this.addEventListeners();
        },

        addEventListeners: function() {
        },

        /*
        * Description/comments
        */
        someOtherFunction: function() {
        }
    };

})(jQuery, window.APP || {});

define(/*@Parrameters dependencies*/['Backbone', 'router'], function(Backbone, Router){



    function init(){
        var router = new Router();
        var fragment = Backbone.history.fragment;

        // console.log(fragment);

        if(!fragment){
            Backbone.history.start({silent: true});

            Backbone.history.fragment = '';
            Backbone.history.navigate('#index', {trigger: true, replace: true});
        } else {
            Backbone.history.navigate('fragment', {trigger: true});
        }
    }


    return {
        init: init
    }
});
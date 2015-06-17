define([
    'models/hero',
    'views/mainView'
], function(heroModel,mainView){
    var Heroes = Backbone.Collection.extend({
        model: heroModel,

        initialize: function(){

            this.fetch({
            context:this,
                reset: true
            });
        },

        url: '/heroes/'
    });

    return Heroes;
});
define([
    'models/hero'
], function(heroModel){
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
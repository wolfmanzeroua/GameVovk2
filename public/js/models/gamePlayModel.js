define([], function(){
    var GamePlayControl = Backbone.Model.extend({
        urlRoot: '/setGamePlay/'
    });

    return GamePlayControl;
});
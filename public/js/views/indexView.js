define([
],function(mainViewTemplate){
    var indexView = Backbone.View.extend({
        el: '#contentHolder',
        initialize: function(){
            this.render()
        },

        render: function(){
            this.$el.html("");
            return this;
        }
    });
    return indexView;
});
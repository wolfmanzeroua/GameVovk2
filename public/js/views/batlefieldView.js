define([
        'text!templates/batlefieldViewTemplate.html'
    ],function(batlefielTemplate){

        var batlefieldView = Backbone.View.extend({

            el:'#forMap',
            template:_.template(batlefielTemplate),

            initialize: function(){
                this.render();
                console.log('batlefieldView initialize')
            },
            render: function(){
                this.$el.html(this.template());
                return this;
            }
        });
    return batlefieldView;
    }
);
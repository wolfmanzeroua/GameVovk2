/**
 * Created by Roman on 28.05.2015.
 */
define([
    'text!templates/topBarTemplate.html',
    'views/Hero/createView'
], function (topBarTemplate, createView) {
    var mainView = Backbone.View.extend({
        el: '#topBar',

        template: _.template(topBarTemplate),

        events: {
            "click #createHero": "goToCreateHero",
            "click #changeProperties": "goToChangeProperties",
            "click #showDatabase": "goToShowDatabase"
        },

        initialize: function () {
            this.render();
        },

        goToCreateHero: function(e){

            e.preventDefault();
            e.stopPropagation();

            var targetEl = $(e.target);
            console.log(targetEl);

            var hash = targetEl.data('hash');
            //console.log(hash);

            //hash = 'jsGroup/' + hash;
            new createView();
            Backbone.history.navigate(hash, {trigger: true});

        },
        goToChangeProperties: function(e){
            e.preventDefault();

            var targetEl = $(e.target);
            var hash = targetEl.data('hash');
            hash = 'jsGroup/' + hash;

            Backbone.history.navigate(hash, {trigger: true});
        },

        //create: function(e){
        //    new createView();
        //},

        render: function () {
            //$(#content).html();
            this.$el.html(this.template());

            return this;
        }
    });

    return mainView;
});
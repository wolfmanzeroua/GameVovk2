/**
 * Created by Roman on 28.05.2015.
 // */
define([
    'text!templates/mainViewTemplate.html',
    'views/batlefieldView',
    'views/topBarView'

], function (mainTemplate, batlefieldView, topBarView) {
    var mainView = Backbone.View.extend({
        el: '#content',

        template: _.template(mainTemplate),

        events: {
            'click #showMap' : 'showMapClicked'
        },

        initialize: function () {
            this.render();
        },

        showMapClicked: function(){
            var el = this.$el;
            var check = el.find('#showMap')[0].checked;

            if (!check) {
                $("#forMap").css("display","none");
            }
            else{
                $("#forMap").css("display","block");

            }

            console.log(check);

        },

        render: function () {
            //$(#content).html();
            this.$el.html(this.template());

            new topBarView();
            new batlefieldView();

            return this;
        }
    });

    return mainView;
});

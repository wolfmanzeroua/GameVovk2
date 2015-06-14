
define([
    'Backbone',
    'views/mainView',
    'views/Hero/createView',
    'views/Hero/changeView',
    'views/databaseView'

], function (Backbone, mainView,createView,changeView, databaseView ) {
    var Router = Backbone.Router.extend({

        mainView: null,
        contentView: null,

        routes: {
            "index": "index",
            "createHero": "createHero",
            "changeProperties": "changeProperties",
            "showDatabase": "showDatabase"

        },
//
//        getContent: function (Content) {
//            var contentViewUrl = 'views/' + Content + '/content';
//            var contentCollection = 'collections/' + Content.toLowerCase() + 's';
//            var self = this;
//
//            require([contentCollection, contentViewUrl], function(Collection, contentView){
//                var collection = new Collection();
//
//                var f = self.changeContenView.bind(self, contentView, collection);
//
//                collection.on('reset', f, self);
//            });
//        },
//
//        changeContenView: function(view, collection){
//            if(this.contentView){
//                this.contentView.undelegateEvents();
//            }
//
//            this.contentView = new view({collection: collection});
//        },
        index: function () {
            if (!this.mainView) {
                this.mainView = new mainView();
            }
        console.log('index');
        },

        createHero: function () {

            if(this.contentView){
                this.contentView.undelegateEvents();
            }
            console.log('createHero');
            this.contentView = new createView();

         },

        changeProperties: function () {

            if(this.contentView){
                this.contentView.undelegateEvents();
            }
            console.log('changeProperties');
            this.contentView = new changeView();


        },

        showDatabase: function () {
            if(this.contentView){
                this.contentView.undelegateEvents();
            }
            console.log('showDatabase');
            this.contentView = new databaseView();

        }
    });
//
    return Router;
});
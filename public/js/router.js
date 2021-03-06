
define([
    'Backbone',
    'views/mainView',
    'views/Hero/createView',
    'views/Hero/changeView',
    'views/databaseView',
    'views/indexView'

], function (Backbone, mainView,createView,changeView, databaseView, indexView ) {
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
            new indexView();
            console.log('index');
        },

        createHero: function () {

            if(this.contentView){
                this.contentView.undelegateEvents();
            }
            console.log('createHero clicked');
            this.contentView = new createView();

            // анімація переїзду до елемента
            if (navigator.userAgent.search("Safari") >= 0 ) {
                $('body').animate({scrollTop: $('#contentHolder').offset().top}, 1100);
            } else {
                $('html').animate({scrollTop: $('#contentHolder').offset().top}, 1100);
            };

        },

        changeProperties: function () {

            if(this.contentView){
                this.contentView.undelegateEvents();
            }
            console.log('changeProperties clicked');
            this.contentView = new changeView();

            // анімація переїзду до елемента
            if (navigator.userAgent.search("Safari") >= 0 ) {
                $('body').animate({scrollTop: $('#contentHolder').offset().top}, 1100);
            } else {
                $('html').animate({scrollTop: $('#contentHolder').offset().top}, 1100);
            };

        },

        showDatabase: function () {
            if(this.contentView){
                this.contentView.undelegateEvents();
            }
            console.log('showDatabase clicked');
            this.contentView = new databaseView();

            // анімація переїзду до елемента
            if (navigator.userAgent.search("Safari") >= 0 )  {
                $('body').animate({scrollTop: $('#contentHolder').offset().top}, 1100);
            } else {
                $('html').animate({scrollTop: $('#contentHolder').offset().top}, 1100);
            };

        }
    });
//
    return Router;
});
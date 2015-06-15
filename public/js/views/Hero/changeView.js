
define([
    'text!templates/Hero/change.html',
    'models/hero',
    'collections/heroes'

], function (content, UserModel,HeroesCollection) {
    var mainView = Backbone.View.extend({
        el: '#contentHolder',

        template: _.template(content),

        events: {
            'click #saveChangesBtn' : 'saveChanges',
            'change #heroSelect' : 'heroSelected'
        },

        initialize: function () {
            console.log('changeView initialize');



            this.collection =  new HeroesCollection();
            //this.collection.bind('reset', this.render, this);
            this.collection.bind('reset', this.render, this);


        },

        heroSelected: function() {
            console.log('heroSelected');
        },


        saveChanges: function(e){
            var el = this.$el;
            var model = new UserModel();
            var firstName = el.find('#first').val();
            var lastName = el.find('#last').val();
            var age = el.find('#age').val();

            var data = {
                name: {
                    first: firstName,
                    last: lastName
                },
                age: age
            };
            console.log('SaveChangeButton pressed');
            //model.save(data, {
            //    success: function(model){
            //        Backbone.history.fragment = '';
            //        Backbone.history.navigate('index', {trigger: true});
            //    },
            //    error: function(err, xhr, model){
            //        alert(xhr);
            //    }
            //});
        },

        render: function () {

            console.log('ChangeView render started');

            console.log('Loaded collections:',this.collection);

            //console.log('Loaded collections',this.collection.toJSON());


            this.$el.html(this.template());

            this.collection.each( function(item){

                console.log('hero: ',item.attributes.name);
                $('#heroSelect')
                    .append($("<option></option>")
                        .attr("value",item.attributes.heroID)
                        .text(item.attributes.name));
            });
            //this.collection.forEach( function(item){
            //               var hero =  item;
            //               console.log('hero',hero);
            //               $('#heroSelect')
            //                   .append($("<option></option>")
            //                       .attr("value",hero.heroID)
            //                       .text(hero.name));
            //           });



            return this;
        }
    });

    return mainView;
});
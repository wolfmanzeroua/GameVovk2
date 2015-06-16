/**
 * Created by Roman on 28.05.2015.
 // */
define([
    'text!templates/mainViewTemplate.html',
    'views/batlefieldView',
    'views/topBarView',
    'models/gamePlayModel',
    'collections/heroes'

], function (mainTemplate, batlefieldView, topBarView, gamePlayControl,HeroesCollection) {
    var mainView = Backbone.View.extend({
        el: '#content',

        template: _.template(mainTemplate),

        events: {
            'click #showMap' : 'showMapClicked',
            'click #startGame': 'sendStartGame',
            'click #typeOfGameDm': 'sendTypeOfGameDm',
            'click #typeOfGameVs':  'sendTypeOfGameVs',
            'change #gameSped': 'sendGameSpeed'
        },

        initialize: function () {
            this.render();
            var interval = $('#gameSped').val();

            //clearInterval(gameSpedTimer);
            Window.gameSpedTimer = setInterval(function () {
                    console.log(interval);
                Window.collection =  new HeroesCollection();
                 }, interval);
        },

        sendStartGame: function(){
            console.log('startGame clicked');
            var model = new gamePlayControl();
            var data ={
                startGame: true
            };
            model.save(data, {
                success: function(model, response){
                    //  console.log('Success send Start Game')
                    console.log(response.text);

                },
                error: function(err, xhr, model, response){
                    console.log('Error sending');
                    alert(response);
                }
            });

        },

        sendTypeOfGameDm: function(){
            console.log('TypeOfGameDm clicked');
            //clanVsClan
            var model = new gamePlayControl();
            var data ={
                typeOfGame: 'Deathmatch'
            };
            model.save(data, {
                success: function(model, response){
                    //  console.log('Success send Start Game')
                    console.log(response.text);

                },
                error: function(err, xhr, model, response){
                    console.log('Error sending');
                    alert(response);
                }
            });

        },

        sendTypeOfGameVs: function(){
            console.log('TypeOfGameVs clicked');
            var model = new gamePlayControl();
            var data ={
                typeOfGame: 'clanVsClan'
            };
            model.save(data, {
                success: function(model, response){
                    //  console.log('Success send Start Game')
                    console.log(response.text);

                },
                error: function(err, xhr, model, response){
                    console.log('Error sending');
                    alert(response);
                }
            });

        },

        sendGameSpeed: function(){
            console.log('GameSpeed changed');
            var model = new gamePlayControl();
            var interval = $('#gameSped').val();

            clearInterval(Window.gameSpedTimer);
            Window.gameSpedTimer = setInterval(function () {
                console.log(interval);
            }, interval);

            //console.log('interval is set to: ' +interval );
            var data ={
                timeBetweenSteps: interval
            };
            model.save(data, {
                success: function(model, response){
                    //  console.log('Success send Start Game')
                    console.log(response.text);

                },
                error: function(err, xhr, model, response){
                    console.log('Error sending');
                    alert(response);
                }
            });

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

            console.log('showMapClicked checked',check);

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

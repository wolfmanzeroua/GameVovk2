/**
 * Created by Roman on 28.05.2015.
 // */
define([
    'text!templates/mainViewTemplate.html',
    'views/batlefieldView',
    'views/topBarView',
    'models/gamePlayModel',
    'collections/heroes',
    'models/obstacles',
    'D3'

], function (mainTemplate, batlefieldView, topBarView, gamePlayControl,HeroesCollection, obstaclesOnMap,D3) {
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
                console.log('timer:',interval);
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
                console.log('timer:',interval);
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
            var d,_d;
            var self = this;
            //$(#content).html();
            this.$el.html(this.template());

            new topBarView();
            new batlefieldView();
            this.mapObstacles = new obstaclesOnMap();
            this.mapObstacles .fetch({

                success: function(model){
                    _d = self.mapObstacles.toJSON();
                    d = _d.array;
                    console.log('Obstacles loaded: ', d);
                    console.log('Obstacles loaded: ', d.length);

                    // Нарешті, добрався до D3 ... не годно бути!... всім пристібнути паски безбеки!!! :)

                    for (var i = d.length-1; i>=0; i--) {
                        function setColor(type) {
                            /* Тип перешкод, type
                             * 1 - Ліс
                             * 2 - Болото
                             * 3 - Гора
                             * 4 - Озеро
                             */

                            if (type == 1) return 'LightGreen';
                            if (type == 2) return 'Tan';
                            if (type == 3) return 'DimGray';
                            if (type == 4) return 'SkyBlue';

                        }

                        if (d[i].fіgura == 1) {
                            // addTriangleToSvg(setColor(d[i].type), d[i].x1, 600 - d[i].y1, d[i].x2, 600 - d[i].y2, d[i].x3, 600 - d[i].y3);
                        }
                        if (d[i].fіgura == 2) {
                            //addRectangleToSvg(setColor(d[i].type), d[i].x1, 600 - d[i].y1, d[i].x2, 600 - d[i].y2, d[i].x3, 600 - d[i].y3, d[i].x4, 600 - d[i].y4);
                            D3.select("#mySvg")
                                .append("rect")
                                .attr("x", d[i].x1)
                                .attr("y",  600 - d[i].y1)
                                .attr("width",  d[i].x2)
                                .attr("height",  600 - d[i].y2)
                        .style("fill", setColor(d[i].type));
                        }

                        if (d[i].fіgura == 3) {
                            //addElipseToSvg(setColor(d[i].type), d[i].cx, 600 - d[i].cy, d[i].rx, d[i].ry);
                            D3.select("#mySvg")
                                .append("ellipse")
                                .attr("cx",  d[i].cx)
                                .attr("cy", 600 - d[i].cy)
                                .attr("rx",  d[i].rx)
                                .attr("ry", d[i].ry)
                                .style("fill", setColor(d[i].type));
                            //console.log(d[i]);
                        }
                    }


                },
                error: function(err, xhr, model){
                    alert(xhr);
                }
            });

            return this;
        }
    });

    return mainView;
});

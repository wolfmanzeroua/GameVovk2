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


            this.collection =  new HeroesCollection();
            this.collection.bind('reset',this.updateBatlefieldMap, this);
            this.render();

          //  var self = this;

            //clearInterval(gameSpedTimer);


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
            $('#dethmatch').css('visibility', 'visible');
            $('#vs').css('visibility', 'hidden');

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
            $('#dethmatch').css('visibility', 'hidden');
            $('#vs').css('visibility', 'visible');
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
            var self= this;
            console.log('GameSpeed changed');
            var model = new gamePlayControl();
            var interval = $('#gameSped').val();

            clearInterval(this.gameSpedTimer);
            this.gameSpedTimer = setInterval(function () {
                console.log('timer:',interval);

                self.collection.fetch({
                    context:this,
                    reset: true
                });

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

        updateBatlefieldMap: function() {
            Window.heroCollection = this.collection.toJSON();

            console.log('BatlefieldMap Updating...');
            var heroDiv;
            var areaColor;
            var textContent;
            var heroNumber;
            var hero;
            console.log('BatlefieldMap Updating...', Window.heroCollection);

            for (var i = Window.heroCollection.length-1; i>=0; i--){
                hero = Window.heroCollection[i];
                areaColor = '#0A0EF2';

                console.log('hero: ',hero.name);

                heroNumber = hero.heroID;
                heroDiv = $("#batlefieldList" + heroNumber);
                areaColor = '#0A0EF2';
                console.log("#batlefieldList" + heroNumber);
                console.log(heroDiv);
                //console.log("" + hero.name + heroNumber);

                // Обновляэмо героя в DIV Геро ліст


                if (hero.clan == 'Vampires') {
                    areaColor = 'red';
                }


                //    // Добавляємо героя в DIV Геро ліст
                textContent = heroNumber + " " + hero.name + "\u2764" + hero.health + " (" + hero.x + "," + hero.y + ")";

                //console.log(textContent);
                // $("#databaseList").append("<div> </div>"). attr("id", "list" + hero.name + heroNumber).attr("class", "list").css({"color": areaColor}).attr("data-hash", "" + heroNumber).text(textContent);

                if (hero.health <= 0) {
                    textContent = "\u2620 " + textContent;
                    areaColor = 'black';
                }

                if (!heroDiv.length) {
                    $("<div> </div>").
                        attr("id", "batlefieldList" + heroNumber).
                        attr("class", "batlefieldList").css({"color": areaColor}).
                        attr("data-hash", "" + heroNumber).
                        text(textContent).
                        //   mouseover(function() {this.style.cursor = 'pointer';}).
                        appendTo("#batlefieldList");

                    D3.select("#mySvg")
                        .append("circle")
                        .attr("cx",  hero.x)
                        .attr("id", "C" + hero.name + heroNumber)
                        .attr("cy", 600 - hero.y)
                        .attr("r",  hero.attackRange)
                        .style("fill", areaColor);

                    //var c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    //c1.setAttribute("cx", hero.x + "px");
                    //c1.setAttribute("cy",(600 - hero.y) + "px");
                    //c1.setAttribute("r", hero.attackRange + "px");
                    //c1.setAttribute("id", "" + hero.name + heroNumber);
                    //c1.setAttribute("fill", areaColor);
                    //c1.setAttribute("opacity", "0.5");


                }

                else {
                    $("#batlefieldList" + heroNumber).
                        // attr("id", "DbList" + heroNumber).
                        attr("class", "batlefieldList").
                        css({"color": areaColor}).
                        attr("data-hash", "" + heroNumber).
                        text(textContent);

                    D3.select("#C" + hero.name + heroNumber)
                        .attr("cx",  hero.x)
                        .attr("cy", 600 - hero.y)
                        .attr("r",  hero.attackRange)
                        .style("fill", areaColor);
                    //   mouseover(function() {this.style.cursor = 'pointer';}).

                }

            };

            return this;

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
            var self = this;
                        //$(#content).html();
            this.$el.html(this.template());

            new topBarView();
            new batlefieldView();

            var interval = $('#gameSped').val();
            this.gameSpedTimer = setInterval(function () {
                console.log('timer:',interval);

                self.collection.fetch({
                    context:this,
                    reset: true
                });

                //  self.updateBatlefieldMap();

            }, interval);





            return this;
        }
    });

    return mainView;
});

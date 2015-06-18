define([
    'text!templates/databaseViewTemplate.html',
    'collections/heroes',
    'models/heroesHistory',
    'collections/avatars'
],function(content, HeroesCollection, heroesHistory,HeroesAvatars){
    var databaseView = Backbone.View.extend({

        el: '#contentHolder',
        events: {
            'click .DbList': 'showHeroInfo',
            'mouseover .DbList': 'changePointer',
            'mouseout .DbList': 'clearDecoration'
        },

        template: _.template(content),

        initialize: function(){
            var self = this;
            console.log('DatabaseView Inialized');

            this.avatarCollection =  new HeroesAvatars();
            this.avatarCollection.fetch({
                success: function(model){
                    console.log('Avatars loaded: ',  self.avatarCollection);
                    self.render();
                },
                error: function(err, xhr, model){
                    alert(xhr);
                }
            });
            //this.render();

        },
        clearDecoration:function(e) {
            $(e.target).css({"background-color":"white"});
        },

        changePointer: function(e){
            $(e.target).css({"cursor":"pointer"});
            $(e.target).css({"background-color":"#d3d3d3"});

        },

        showHeroInfo: function(e){
            var avatarCollection = this.avatarCollection.toJSON();

            var id = $(e.target).attr('data-hash');
            var findOwnerId;
            for (var i =avatarCollection.length-1; i>=0; i--){
                if (avatarCollection[i].owner == id) {
                    findOwnerId = i;
                    // console.log('-------------------------------------------id:',id,' i: ',i);

                }
            }
            var hero = Window.heroCollection[id];
            Window.avatarCollection =avatarCollection;
            //var heroAvatar =  avatarCollection[id].avatar;
            $('#imgDB').attr('src',avatarCollection[findOwnerId].avatar);


            var str = "";
            var d;
            var self = this;
            for(var k in hero) {
                str += "<b>"+ k+": </b>"+ hero[k]+"<br>";
            };
            console.log('Clicked HeroID',id);

            $("#propertyList").text("");
            $("#propertyList").append(str);
            $("#properties").text(hero.name + " property");
            $("#history").text(hero.name + " history");

            this.updateHeroList();

            this.history = new heroesHistory({id: id});

            this.history.fetch({
                success: function(model){

                    d = self.history.toJSON();
                    console.log('History model loaded: ',  self.history);
                    //console.log('History model loaded: ', d);

                    $("#historyLog").text("");
                    $("#historyLog").append(d.historyArray.log.join('<br>'));

                },
                error: function(err, xhr, model){
                    alert(xhr);
                }
            });


        },

        render: function () {


            console.log('DatabaseView render');
            this.$el.html(this.template());
            this.updateHeroList()
        },

        updateHeroList: function(){

            var heroDiv;
            var areaColor;
            var textContent;
            var heroNumber;
            var hero;

            for (var i = Window.heroCollection.length-1; i>=0; i--){
                hero = Window.heroCollection[i];
                areaColor = '#0A0EF2';

                console.log('hero: ',hero.name);

                heroNumber = hero.heroID;
                // console.log('Оновлення списку Дів взяо ІД',"list" + hero.name + heroNumber);
                heroDiv = $("#DbList" + heroNumber);
                areaColor = '#0A0EF2';
                console.dir("#DbList" + heroNumber);
                console.dir(heroDiv);
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
                        attr("id", "DbList" + heroNumber).
                        attr("class", "DbList").css({"color": areaColor}).
                        attr("data-hash", "" + heroNumber).
                        text(textContent).
                        //   mouseover(function() {this.style.cursor = 'pointer';}).
                        appendTo("#databaseList");
                }

                else {
                    $("#DbList" + heroNumber).
                        // attr("id", "DbList" + heroNumber).
                        attr("class", "DbList").css({"color": areaColor}).
                        attr("data-hash", "" + heroNumber).
                        text(textContent);
                    //   mouseover(function() {this.style.cursor = 'pointer';}).

                }

            };



            return this;
        }


    });

    return databaseView;
});

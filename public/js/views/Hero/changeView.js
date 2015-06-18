
define([
    'text!templates/Hero/change.html',
    'models/hero',
    'collections/avatars'


], function (content, HeroModel,HeroesAvatars) {
    var mainView = Backbone.View.extend({
        el: '#contentHolder',

        template: _.template(content),

        events: {
            'click #saveChangesBtn' : 'saveChanges',
            'change #heroSelect' : 'heroSelected',
            'change #inputImg':'loadImg'
        },

        loadImg: function(){

            var file    = document.querySelector('input[type=file]').files[0]; //sames as here
            var reader  = new FileReader();

            reader.onloadend = function () {
                $('#imgChange').attr('src',reader.result);
            };

            if (file) {
                reader.readAsDataURL(file); //reads the data as a URL

            } else {

            }
        },

        initialize: function () {
            var self =this;
            console.log('changeView initialize');


            this.avatarCollection =  new HeroesAvatars();
            this.avatarCollection.fetch({
                success: function(model){

                    //d = self.avatarCollection.toJSON();
                    console.log('Avatars loaded: ',  self.avatarCollection);
                    // console.log('History model loaded: ', d);
                    self.render();
                },
                error: function(err, xhr, model){
                    alert(xhr);
                }
            });
            //Window.collection.bind('reset', this.render, this);


        },

        heroSelected: function() {
            var avatarCollection = this.avatarCollection.toJSON();
            console.log('Selected heroID:',  $('#heroSelect').val());
            if ($('#heroSelect').val()!='none') {

                var hero = Window.heroCollection[$('#heroSelect').val()];

                var findOwnerId;
                var id = $('#heroSelect').val();
                for (var i =avatarCollection.length-1; i>=0; i--){
                    if (avatarCollection[i].owner == id) {
                        findOwnerId = i;
                        //  console.log('-------------------------------------------id:',id,' i: ',i);

                    }
                }
                $('#imgChange').attr('src',avatarCollection[findOwnerId].avatar);

                $('#name').val(hero.name);
                hero.clan == 'X-Men' ? $('#clan')[0].checked = true : $('#clan2')[0].checked = true;
                $('#features').val(hero.features);
                $('#hairСolor').val(hero.hairСolor);
                $('#beard').val(hero.beard);
                $('#tits').val(hero.tits);
                hero.sex == 'Man' ? $('#sex')[0].checked = true : $('#sex2')[0].checked = true;
                $('#health').val(hero.health);
                $('#maxHealth').val(hero.maxHealth);
                $('#power').val(hero.power);
                $('#attackRange').val(hero.attackRange);
                $('#damage').val(hero.damage);
                $('#specDamage').val(hero.specDamage);
                $('#chanceSpecDamage').val(hero.chanceSpecDamage);
                //hero.defence = $('#defence').val();
                $('#speed').val(hero.speed);
                hero.canFly ? $('#canFly')[0].checked = true : $('#canFly2')[0].checked = true;
                $('#flySpeed').val(hero.flySpeed);
                $('#level').text(hero.level);
                console.log(hero.level);
                hero.canBeInvisible ? $('#canBeInvisible')[0].checked = true : $('#canBeInvisible2')[0].checked = true;
                hero.invisible ? $('#invisible')[0].checked = true : $('#invisible2')[0].checked = true;
                hero.canJump ? $('#canJump')[0].checked = true : $('#canJump2')[0].checked = true;
                hero.canTeleport ? $('#canTeleport')[0].checked = true : $('#canTeleport2')[0].checked;
                hero.canShoot ? $('#canShoot')[0].checked = true : $('#canShoot2')[0].checked = true;
                hero.canFreeze ? $('#canFreeze')[0].checked = true : $('#canFreeze2')[0].checked = true;
                hero.isFreeze ? $('#isFreeze')[0].checked = true : $('#isFreeze2')[0].checked = true;
                hero.isFly ? $('#isFly')[0].checked = true : $('#isFly2')[0].checked = true;
                hero.canHealing ? $('#canHealing')[0].checked = true : $('#canHealing2')[0].checked = true;
                $('#healingMaxPoint').val(hero.healingMaxPoint);
                hero.hasVampBite ? $('#hasVampBite')[0].checked = true : $('#hasVampBite2')[0].checked = true;
                hero.lookForTrouble ? $('#lookForTrouble')[0].checked = true : $('#lookForTrouble2')[0].checked = true;
                $('#x').val(hero.x);
                $('#y').val(hero.y);
                $('#nextDestinationPointX').val(hero.nextDestinationPointX);
                $('#nextDestinationPointY').val(hero.nextDestinationPointY);
                $('#heroID').val(hero.heroID);
            }
            else {
                $('#heroID').val(-1);
            };

        },


        saveChanges: function(e){

            var el = this.$el;
            var model = new HeroModel();
            var data ={};
            var self= this;

            data.avatar = el.find('#imgChange').attr('src');
            console.log('Change form avatar: ',data.avatar);
            data.name = el.find('#name').val();
            data.clan = el.find('#clan')[0].checked ? 'X-Men' : 'Vampires';
            data.features  = el.find('#features').val();
            data.hairСolor =el.find('#hairСolor').val();
            data.beard = el.find('#beard').val();
            data.tits = el.find('#tits').val();
            data.sex = el.find('#sex')[0].checked ? 'Man' : 'Woman';
            data.health = +el.find('#health').val();
            //data.maxHealth = el.find('#maxHealth').val();
            data.power = +el.find('#power').val();
            data.attackRange =  +el.find('#attackRange').val();
            data.damage =  +el.find('#damage').val();
            data.specDamage =  +el.find('#specDamage').val();
            data.chanceSpecDamage =  +el.find('#chanceSpecDamage').val();
            //data.defence = el.find('#defence').val();
            data.speed = +el.find('#speed').val();
            data.canFly = el.find('#canFly')[0].checked;
            data.flySpeed = +el.find('#flySpeed').val();
            data.canBeInvisible = el.find('#canBeInvisible')[0].checked;
            data.invisible = el.find('#invisible')[0].checked;
            data.canJump = el.find('#canJump')[0].checked;
            data.canTeleport = el.find('#canTeleport')[0].checked;
            data.canShoot= el.find('#canShoot')[0].checked;
            data.canFreeze = el.find('#canFreeze')[0].checked;
            data.isFreeze = el.find('#isFreeze')[0].checked;
            data.isFly = el.find('#isFly')[0].checked;
            data.canHealing = el.find('#canHealing')[0].checked;
            data.healingMaxPoint = +el.find('#healingMaxPoint').val();
            data.hasVampBite = el.find('#hasVampBite')[0].checked;
            data.lookForTrouble = el.find('#lookForTrouble')[0].checked;
            //data.x = +el.find('#x').val();
            //data.y = +el.find('#y').val();
            data.nextDestinationPointX = +el.find('#nextDestinationPointX').val();
            data.nextDestinationPointY = +el.find('#nextDestinationPointY').val();
            data.heroID = +el.find('#heroID').val();

            console.log('SaveChangeButton pressed');

            model.save(data, {patch:true,
                success: function(model, response){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('index', {trigger: true});
                    //console.log(response);
                    console.log('Success patched');
                    alert('Success patched');
                    //self.$el.html("");

                },
                error: function(err, xhr, model){
                    console.log('Error created',xhr);
                    alert(xhr.responseText);
                }
            });

        },

        render: function () {
            var hero;

            console.log('ChangeView render started');

            console.log('Loaded collections:',Window.heroCollection);

            //console.log('Loaded collections',Window.collection.toJSON());


            this.$el.html(this.template());

            for (var i = Window.heroCollection.length-1; i>=0; i--){
                hero = Window.heroCollection[i];

                console.log('hero: ',hero.name);
                $('#heroSelect')
                    .append($("<option></option>")
                        .attr("value",hero.heroID)
                        .text(hero.name));
            };

            return this;
        }
    });

    return mainView;
});
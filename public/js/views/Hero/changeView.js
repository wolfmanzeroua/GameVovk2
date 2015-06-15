
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
            console.log('Selected heroID:',  $('#heroSelect').val());
            var hero= this.collection.at( $('#heroSelect').val()).toJSON();


            $('#name').val( hero.name);
            hero.clan=='X-Men' ? $('#clan')[0].checked = true : $('#clan2')[0].checked = true;
            $('#features').val(hero.features);
            $('#hairСolor').val(hero.hairСolor);
            $('#beard').val(hero.beard);
            $('#tits').val(hero.tits);
            hero.sex == 'Man'? $('#sex')[0].checked  = true : $('#sex2')[0].checked  = true;
            $('#health').val(hero.health);
            $('#maxHealth').val(hero.maxHealth);
            $('#power').val(hero.power);
            $('#attackRange').val(hero.attackRange);
            $('#damage').val(hero.damage);
            $('#specDamage').val(hero.specDamage);
            $('#chanceSpecDamage').val(hero.chanceSpecDamage);
            //hero.defence = $('#defence').val();
            $('#speed').val(hero.speed);
            hero.canFly ? $('#canFly')[0].checked = true: $('#canFly2')[0].checked = true;
            $('#flySpeed').val(hero.flySpeed);
            hero.canBeInvisible ? $('#canBeInvisible')[0].checked = true: $('#canBeInvisible2')[0].checked = true ;
            hero.invisible ? $('#invisible')[0].checked = true : $('#invisible2')[0].checked = true;
            hero.canJump ? $('#canJump')[0].checked = true : $('#canJump2')[0].checked = true;
            hero.canTeleport ? $('#canTeleport')[0].checked= true :$('#canTeleport2')[0].checked ;
            hero.canShoot ? $('#canShoot')[0].checked = true : $('#canShoot2')[0].checked = true;
            hero.canFreeze ? $('#canFreeze')[0].checked = true : $('#canFreeze2')[0].checked = true;
            hero.isFreeze ? $('#isFreeze')[0].checked = true : $('#isFreeze2')[0].checked = true;
            hero.isFly ? $('#isFly')[0].checked = true : $('#isFly2')[0].checked = true;
            hero.canHealing ? $('#canHealing')[0].checked= true : $('#canHealing2')[0].checked= true;
            $('#healingMaxPoint').val(hero.healingMaxPoint);
            hero.hasVampBite ? $('#hasVampBite')[0].checked = true :$('#hasVampBite2')[0].checked= true;
            hero.lookForTrouble ? $('#lookForTrouble')[0].checked = true : $('#lookForTrouble2')[0].checked = true;
            $('#x').val(hero.x);
            $('#y').val(hero.y);
            $('#nextDestinationPointX').val(hero.nextDestinationPointX);
            $('#nextDestinationPointY').val(hero.nextDestinationPointY);


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
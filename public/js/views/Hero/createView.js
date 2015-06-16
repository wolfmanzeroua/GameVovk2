
define([
    'text!templates/Hero/create.html',
    'models/hero'
], function (content, HeroModel) {
    var mainView = Backbone.View.extend({
        el: '#contentHolder',

        template: _.template(content),

        events: {
            'click #saveBtn' : 'saveUser',
            'click #defaultProperty':'defaultPropertyChecked',
            'click #ownProperty':'ownPropertyChecked'
        },

        defaultPropertyChecked: function (){
            console.log('defaultPropertyChecked');
            $( ".hiddenByDefault" ).css( "display", "none" );

        },

        ownPropertyChecked: function (){
            console.log('ownPropertyChecked');
            $( ".hiddenByDefault" ).css( "display", "table-cell" );
        },


        initialize: function () {
            console.log('createView initialize');
            this.render();

        },


        saveUser: function(e){
            console.log('Save Button pressed');
            var el = this.$el;
            var model = new HeroModel();
            var data ={};
            var self = this;

            if (el.find('#defaultProperty')[0].checked) {

                data.defaultProperty = true;
                data.name = el.find('#name').val();
                data.clan = el.find('#clan')[0].checked ? 'X-Men' : 'Vampires';
                //console.log(el.find('#clan'));
                //console.log(el.find('#name'));

                data.x = +el.find('#x').val();
                data.y = +el.find('#y').val();

            }
            else {
                data.defaultProperty = false;
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
                data.x = +el.find('#x').val();
                data.y = +el.find('#y').val();
                //data.nextDestinationPointX = +el.find('#nextDestinationPointX').val();
                //data.nextDestinationPointY = +el.find('#nextDestinationPointY').val();


            }

            console.log(data);
            model.save(data, {
                success: function(model, response){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('index', {trigger: true});
                    //console.log(response);
                    console.log('Success created');
                    alert(response.text);
                   // self.$el.html("");

                },
                error: function(err, xhr, model, response){
                    console.log('Error created');
                    alert(response);
                }
            });
        },
        //var UserSchema = new Schema({
        //    name: String,
        //    dateOfBirth: {type: Date, default: Date.now},//JSON
        //    clan : String,
        //    features : String,
        //    hairСolor : String,
        //    beard : String,
        //    tits : String,
        //    sex : String,
        //    health : Number,
        //    maxHealth : Number,
        //    power : Number,
        //    attackRange : Number,
        //    damage : Number,
        //    specDamage : Number,
        //    chanceSpecDamage : Number,
        //    defence : Number,
        //    speed : Number,
        //    canFly : Boolean,
        //    flySpeed : Number,
        //    canBeInvisible : Boolean,
        //    invisible : Boolean,
        //    canJump : Boolean,
        //    canTeleport : Boolean,
        //    canShoot : Boolean,
        //    canFreeze : Boolean,
        //    isFreeze : Boolean,
        //    isFly : Boolean,
        //    freezeStepLeft : Number,
        //    canHealing : Boolean,
        //    healingMaxPoint : Number,
        //    hasVampBite : Boolean,
        //    level : Number,
        //    lookForTrouble : Boolean,
        //    //history : ['2323232323232423423'],
        //    x : Number,
        //    y : Number,
        //    PathMapStep : Number,
        //    walkedAllWay : false,
        //    nextDestinationPointX : Number,
        //    nextDestinationPointY : Number,
        //    heroID : Number
        //
        //
        //}, {collection: 'Persons'});

        render: function () {
            var templateHtml = this.template();
            // console.log(templateHtml);
            console.log('createView render');
            this.$el.html(this.template());

            //$.extend($.ui.dialog.prototype.options, {
            //    modal: true,
            //    resizable: false,
            //    draggable:true,
            //    autoOpen:true,
            //    width:700,
            //    create: function( event, ui ) {
            //        var win = $( window );
            //        var dialog = $(event.target).parent(".ui-dialog");
            //        var top = $(document).scrollTop()+(win.height() - dialog.height()-200) / 2;
            //        var left = (win.width() - dialog.width()) / 2;
            //        dialog.css({
            //            position: "absolute",
            //            top: top,
            //            left: left
            //        });
            //    }
            //});

            //        this.$el = $(templateHtml).dialog({
            //            width: '900px',
            //            modal: true,
            //            buttons: [{
            //                text: "Ok", click: function () {
            //                    $(this).dialog("close");
            //                }
            //            }]
            //        });
            //
            return this;
        }
    });

    return mainView;
});
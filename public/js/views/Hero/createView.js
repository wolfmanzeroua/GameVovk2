
define([
    'text!templates/Hero/create.html',
    '../../models/hero'
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
        },

        ownPropertyChecked: function (){
            console.log('ownPropertyChecked');
        },


        initialize: function () {
            console.log('createView initialize');
           this.render();

        },


        saveUser: function(e){
            console.log('Save Button pressed');
            var el = this.$el;
            var model = new HeroModel();




            var name = el.find('#name').val();
            var clan = el.find('#clan')[0].checked ? 'X-Men':'Vampires';
            //console.log(el.find('#clan'));
            //console.log(el.find('#name'));

            var x = el.find('#x').val();
            var y = el.find('#y').val();

            var data = {
                name: name,
                clan : clan,
                x : x,
                y : y,
                };
console.log(data);
            //model.save(data, {
            //    success: function(model){
            //        Backbone.history.fragment = '';
            //        Backbone.history.navigate('jsGroup/User', {trigger: true});
            //    },
            //    error: function(err, xhr, model){
            //        alert(xhr);
            //    }
            //});
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
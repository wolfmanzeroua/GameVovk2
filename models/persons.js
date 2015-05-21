/**
 * Created by Roman on 14.05.2015.
 */
var mongoose = require('mongoose');

module.exports = (function() {
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
        name: String,
        dateOfBirth: {type: Date, default: Date.now},//JSON
        clan : String,
        features : String,
        hairСolor : String,
        beard : String,
        tits : String,
        sex : String,
        health : Number,
        maxHealth : Number,
        power : Number,
        attackRange : Number,
        damage : Number,
        specDamage : Number,
        chanceSpecDamage : Number,
        defence : Number,
        speed : Number,
        canFly : Boolean,
        flySpeed : Number,
        canBeInvisible : Boolean,
        invisible : Boolean,
        canJump : Boolean,
        canTeleport : Boolean,
        canShoot : Boolean,
        canFreeze : Boolean,
        isFreeze : Boolean,
        isFly : Boolean,
        freezeStepLeft : Number,
        canHealing : Boolean,
        healingMaxPoint : Number,
        hasVampBite : Boolean,
        level : Number,
        lookForTrouble : Boolean,
        //history : ['2323232323232423423'],
        x : Number,
        y : Number,
        PathMapStep : Number,
        walkedAllWay : false,
        nextDestinationPointX : Number,
        nextDestinationPointY : Number,
        heroID : Number


    }, {collection: 'Persons'});

    if(!mongoose.Schemas){
        mongoose.Schemas = {};
    }
    mongoose.Schemas['Person'] = UserSchema;
})();
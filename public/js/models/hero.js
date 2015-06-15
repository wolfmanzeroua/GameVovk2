/**
 * Created by Roman on 04.06.2015.
 */
define([], function(){
    var HeroModel = Backbone.Model.extend({
        idAttribute: 'heroID',
        /*url:  function(){
         return '/user/' + this.get('age') + '/' + this.id
         }*/
        urlRoot: function(){
            return '/createHero/'
        }
    });

    return HeroModel;
});

//GET - fetch //
//POST  Model.save
//PUT model.save
//PATCH
//DELETE
define([
    'models/avatar'

], function(heroAvatarModel){
    var HeroesAvtars = Backbone.Collection.extend({
        model: heroAvatarModel,

        url: '/heroAvatars/'
    });

    return HeroesAvtars;
});
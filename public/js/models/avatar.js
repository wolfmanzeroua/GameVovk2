define([], function(){
    var HeroAvatar = Backbone.Model.extend({
        urlRoot: '/heroAvatar/'
    });

    return HeroAvatar;
});
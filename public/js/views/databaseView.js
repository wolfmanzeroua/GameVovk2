define([
    'text!templates/databaseViewTemplate.html'
],function(content){
    var databaseView = Backbone.View.extend({

        el: '#contentHolder',

        template: _.template(content),

        initialize: function(){
            console.log('DatabaseView Inialized');
            this.render();

        },

        render: function () {
            var templateHtml = this.template();
            //console.log(templateHtml);
            console.log('DatabaseView render');
            this.$el.html(this.template());


            return this;
        }


    });

    return databaseView;
});

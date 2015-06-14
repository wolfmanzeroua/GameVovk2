
define([
    'text!templates/Hero/change.html',
    '../../models/hero'
], function (content, UserModel) {
    var mainView = Backbone.View.extend({
        el: '#contentHolder',

        template: _.template(content),

        events: {
            'click #saveChangesBtn' : 'saveChanges'
        },

        initialize: function () {
            console.log('changeView initialize');
            this.render();

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
            var templateHtml = this.template();
            //console.log(templateHtml);
            console.log('changeView render');
            this.$el.html(this.template());


            return this;
        }
    });

    return mainView;
});
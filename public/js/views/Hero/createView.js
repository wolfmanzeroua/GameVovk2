
define([
    'text!templates/Hero/create.html',
    '../../models/hero'
], function (content, HeroModel) {
    var mainView = Backbone.View.extend({
        el: '#contentHolder',

        template: _.template(content),

        events: {
            'click #saveBtn' : 'saveUser'
        },

        initialize: function () {
            console.log('createView initialize');
           this.render();

        },

        saveUser: function(e){
            console.log('Save Button pressed');
            var el = this.$el;
            var model = new HeroModel();

            //var firstName = el.find('#first').val();
            //var lastName = el.find('#last').val();
            //var age = el.find('#age').val();
            //
            //var data = {
            //    name: {
            //        first: firstName,
            //        last: lastName
            //    },
            //    age: age
            //};

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
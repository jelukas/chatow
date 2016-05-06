/**
Router
**/
Router.route('/', function () {
  this.render('Home', {
    data: function () {
      return { username: this.params.query.username };
    }
  });
});
/**
* Templates
*/
if (Meteor.isClient) {

    WebFontConfig = {
      google: { families: [ 'Lato:400,100,300,700,900:latin' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();

    Template.messages.helpers({
        messages: function() {
            return Messages.find({}, { sort: { time: -1}, limit: 10}).fetch().reverse();
        },
        username: function() {
            return Router.current().params.query.username;
        }
    });

    Template.registerHelper( 'equals', ( a1, a2 ) => {
      return a1 == a2;
    });

    Template.input.events = {
      'keydown textarea#message' : function (event) {
        if (event.which == 13) { // 13 is the enter key event
          if (this.username == null || this.username == '' || this.username == undefined){
            var name = 'Anonimo';
          }else{
            var name = this.username;
          }
          var message = document.getElementById('message');
          if (message.value != '') {
            Messages.insert({
              name: name,
              message: message.value,
              time: Date.now(),
            });

            document.getElementById('message').value = '';
            document.getElementById('message').innerHTML = '';
            message.value = '';
          }
        }
      },
      'click button#enviar' : function (event) {
          if (this.username == null || this.username == '' || this.username == undefined){
            var name = 'Anonimo';
          }else{
            var name = this.username;
          }
          var message = document.getElementById('message');
          if (message.value != '') {
            Messages.insert({
              name: name,
              message: message.value,
              time: Date.now(),
            });

            document.getElementById('message').value = '';
            document.getElementById('message').innerHTML = '';
            message.value = '';
          }
      }
    }
}

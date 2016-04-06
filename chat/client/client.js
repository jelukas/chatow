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

    Template.messages.helpers({
        messages: function() {
            return Messages.find({}, { sort: { time: -1}});
        }
    });

    Template.input.events = {
      'keydown input#message' : function (event) {
        if (event.which == 13) { // 13 is the enter key event
          if (this.username == null || this.username == '' || this.username == undefined){
            var name = 'Anonymous';
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
            message.value = '';
          }
        }
      }
    }
}

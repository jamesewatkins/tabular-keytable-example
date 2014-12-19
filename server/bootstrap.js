if (Meteor.isServer) {
  Meteor.startup(function () {

    Factory.define('book', Books, {
      title: function() { return Fake.sentence(); },
      author: function() { return Fake.word(); },
      copies: function() { return _.random(1, 5); }
    });

    if (Books.find({}).count() === 0) {
      _(100).times(function(n) {
        Factory.create('book');
      });
    }
  });
}

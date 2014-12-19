if (Meteor.isClient) {
  Template.TestTemplate.rendered = function() {
     var self = this;
     table = self.$('table').dataTable();

     new $.fn.DataTable.KeyTable( table );

     $(document).on("keyup", function(e) {
       var code = e.which;
       if (code == 34) {
         table.api().page( 'next' ).draw( false );
       } else if (code == 33) {
         table.api().page( 'previous' ).draw( false );
       }
     });
  };
}

Tabular KeyTables Extensions example
====================================

Example project demonstrating how to use the [DataTables](http://datatables.net/)  [KeyTable extension](http://datatables.net/extensions/keytable/) with the [aldeed:tabular](https://github.com/aldeed/meteor-tabular) Meteor package.

## Goals for this example
* Pre-populate data in a Books collection
* Render a DataTable with the Tabular library using the Books Collection
* Add the KeyTable extension to the Data Table
* Modify the KeyTable code to stop Ajax calls from being made every time you use the arrow keys
* Add page up and down key support to the Books DataTable

## Know thy Versions
Here are the versions of everything that I was using at the time of creating this example.  
```console
jim:~/Projects/tabular-example# cat .meteor/release
METEOR@1.0.1
jim:~/Projects/tabular-example# datatabletest# meteor list
aldeed:tabular   0.2.2  Datatables for large or small datasets in Meteor
anti:fake        0.4.1  Random text and data generator
dburles:factory  0.3.7  Factories for Meteor
insecure         1.0.1  Allow all database writes by default
meteor-platform  1.2.0  Include a standard set of Meteor packages in your app
momentjs:moment  2.8.4  Moment.js (official): parse, validate, manipulate, and display dates - official Meteor packaging
twbs:bootstrap   3.3.1_2  Bootstrap (official): the most popular HTML/CSS/JS framework for responsive, mobile first projects

```

## How can I add KeyTable support to my Meteor/Tabular project?
First, put the keytables extension files ( dataTables.keyTable.css, dataTables.keyTable.js  ) in a client facing directory...like /client/lib.

The KeyTables extension currently doesn't work with server-side processing (ajax).   Out of the box you will get be able to select a table cell but it will promptly lose focus (caused by the ajax call).  To get at least some functionality comment out this [line] (https://github.com/DataTables/KeyTable/blob/master/js/dataTables.keyTable.js#L483).   This should eliminate the ajax call being ran every time you use the arrow keys.  I added a page up and page down work around (below) that helps with this.
See Allan's comments [here](http://www.datatables.net/forums/discussion/24202/selecting-a-row-and-navigating-using-arrow-keys) for more info.

Then modify the template render code to register KeyTable with your DataTable.   Like so:
```javascript
Template.TestTemplate.rendered = function() {
  var self = this;
  table = self.$('table').dataTable();

  new $.fn.DataTable.KeyTable( table );

  // Page up/page down functionality
  $(document).on("keyup", function(e) {
    var code = e.which;
    if (code == 34) {
      table.api().page( 'next' ).draw( false );
    } else if (code == 33) {
      table.api().page( 'previous' ).draw( false );
    }
  });
};
```
The rest of the extensions should be able to be added in a similar fashion.  

##Thanks
* To all the people who work on Meteor, DataTables and Tabular so fun to work with

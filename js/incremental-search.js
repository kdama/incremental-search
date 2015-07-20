( function( root ) {

var $  = root.$;
var ko = root.ko;

/* Model */

var Property = function( key, value ) {
  var self = this;

  self.key = ko.observable( key );
  self.value = ko.observable( value );
};

var Item = function() {
  var self = this;

  self.properties = ko.observableArray( [] );

  self.includes = function( keyword ) {
    return self.properties().some( function( property ) {
      return property.value().indexOf( keyword ) !== -1;
    } );
  };
};

/* ViewModel */

var ViewModel = function( url ) {
  var self = this;

  self.url = ko.observable( url );
  self.keyword = ko.observable();
  self.items = ko.observableArray();
  self.errormsg = ko.observable();

  self.loadUrl = function() {
    $.ajax( {
      type: "GET",
      url: self.url(),
      dataType: "jsonp",
      success: function( data ) {
        self.items( self.itemsFromGoogleSheetsJson( data ) );
        self.errormsg( null );
      },
      error: function( xhr, status, error ) {
        self.errormsg( status + " " + xhr.status + ": " + error );
      }
    } );
  };

  self.itemsFromGoogleSheetsJson = function( data ) {
    /*
     *  Name   Age
     *  ----------
     *  Alice  20
     *  Bob    30
     *
     *      |
     *      v
     *
     *  [
     *    { properties: [ { key: "Name", value: "Alice" }, { key: "Age", value: "20" } ] },
     *    { properties: [ { key: "Name", value: "Bob"   }, { key: "Age", value: "30" } ] }
     *  ]
     *
     */

    var sheet = data.feed.entry;
    var items = [];
    var columns = [];

    Object.keys( sheet ).forEach( function( index ) {
      var cell = sheet[ index ].gs$cell;
      var cellCol = cell.col - 1; // col indices start at 1.
      var cellRow = cell.row - 2; // row indices start at 2.
      var cellData = cell.$t;

      if ( cellRow === "-1" ) {
        // this cell is a column label.
        columns[ cellCol ] = cellData;
      } else {
        items[ cellRow ] = items[ cellRow ] || new Item();
        var property = new Property( columns[ cellCol ], cellData );
        items[ cellRow ].properties.push( property );
      }
    });

    return items;
  };

  self.matches = function( item ) {
    // if keyword is empty, show all data.
    return !self.keyword() || item.includes( self.keyword() );
  };
};

ko.applyBindings( new ViewModel( "https://spreadsheets.google.com/feeds/cells/1NH9rvVIudYRMMU4ETmRNdiTJQR36xCVYviVWjTEj5pM/1/public/values?alt=json" ) );

} )( window );

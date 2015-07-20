( function( root ) {

var $  = root.$;
var ko = root.ko;

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
        self.items( self.itemsFromGoogleSheets( data ) );
        self.errormsg( null );
      },
      error: function( xhr, status, error ) {
        self.errormsg( status + " " + xhr.status + ": " + error );
      }
    } );
  };

  self.itemsFromGoogleSheets = function( data ) {
    var sheet = data.feed.entry;
    var items = [];
    var columns = {};

    Object.keys( sheet ).forEach( function( index ) {
      var cell = sheet[ index ].gs$cell;
      var cellCol = cell.col;
      var cellRow = cell.row;
      var cellData = cell.$t;

      if ( cellRow === "1" ) {
        // this cell is a column label.
        columns[ cellCol ] = cellData;
      } else {
        if ( !items[ cellRow ] ) {
          items[ cellRow ] = {};
        }
        items[ cellRow ][ columns[ cellCol ] ] = cellData;
      }
    });

    return items;
  };

  self.matches = function( obj ) {
    // concat all property values...
    var values = "";
    Object.keys( obj ).forEach( function( key ) {
      values += obj[ key ] + " ";
    });

    // if keyword is empty, show all data.
    return !self.keyword() || values.indexOf( self.keyword() ) !== -1;
  };
};

ko.applyBindings( new ViewModel( "https://spreadsheets.google.com/feeds/cells/1NH9rvVIudYRMMU4ETmRNdiTJQR36xCVYviVWjTEj5pM/1/public/values?alt=json" ) );

} )( window );

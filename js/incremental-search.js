( function( root ) {

var $  = root.$;
var ko = root.ko;

/* Collections */

var Property = function( key, value ) {
  this.key = key;
  this.value = value;
};

var Item = function() {
  this.properties = [];
};

Item.prototype.includes = function( keyword ) {
  return this.properties.some( function( property ) {
    return property.value.indexOf( keyword ) !== -1;
  } );
};

/* Model */

var Model = function() {
  this.items = {};
};

Model.prototype.loadUrl = function( url, settings ) {
  $.ajax( url, {
    type: "GET",
    dataType: "jsonp",
    context: this,
  } ).done( function( data ) {
    this.items = this._itemsFromGoogleSheetsJson( data );
    settings.success( this.items );
  } ).fail( function( jqXHR, textStatus, errorThrown ) {
    settings.error( {
      jqXHR: jqXHR,
      textStatus: textStatus,
      errorThrown: errorThrown
    } );
  } );
};

Model.prototype._itemsFromGoogleSheetsJson = function( data ) {
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
  var columnLabels = [];

  Object.keys( sheet ).forEach( function( index ) {
    var cell = sheet[ index ].gs$cell;
    var cellCol = cell.col - 1; // col indices start at 1.
    var cellRow = cell.row - 2; // row indices start at 2.
    var cellData = cell.$t;

    var property;

    if ( cellRow === -1 ) {
      // this cell is a column label.
      columnLabels[ cellCol ] = cellData;
    } else {
      items[ cellRow ] = items[ cellRow ] || new Item();
      property = new Property( columnLabels[ cellCol ], cellData );

      items[ cellRow ].properties.push( property );
    }
  } );

  return items;
};

/* ViewModel */

var ViewModel = function( url, model ) {
  this.url = ko.observable( url );
  this.keyword = ko.observable();
  this.items = ko.observable();
  this.errormsg = ko.observable();
  this.model = ko.observable( model );
};

ViewModel.prototype.loadUrl = function() {
  var self = this;

  this.model().loadUrl( this.url(), {
    success: function( data ) {
      self.items( data );
    },
    error: function( error ) {
      self.errormsg( self._errormsgFromError( error ) );
    }
  } );
};

ViewModel.prototype.matches = function( item ) {
  // if keyword is empty, show all data.
  return !this.keyword() || item.includes( this.keyword() );
};

ViewModel.prototype._errormsgFromError = function ( error ) {
  return error.jqXHR.status + " " + error.textStatus + ": " + error.errorThrown;
};

ko.applyBindings( new ViewModel( "https://spreadsheets.google.com/feeds/cells/1NH9rvVIudYRMMU4ETmRNdiTJQR36xCVYviVWjTEj5pM/1/public/values?alt=json", new Model() ) );

} )( window );

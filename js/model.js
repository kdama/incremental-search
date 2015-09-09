( function( root ) {

var $            = root.$;
var localStorage = root.localStorage;
var inc          = root.inc = root.inc || {};

var Property = inc.Property = function( key, value ) {
  this.key = key;
  this.value = value;
};

var Item = inc.Item = function() {
  this.properties = [];
};

Item.prototype.includes = function( keyword ) {
  return this.properties.some( function( property ) {
    return property.value.indexOf( keyword ) !== -1;
  } );
};

var Model = inc.Model = function() {
  this.items = this._getCache();
};

Model.prototype._storeKeys = {
  items: "incremental-search-items"
};

Model.prototype._getCache = function () {
  var cachedItems = JSON.parse( localStorage.getItem( this._storeKeys.items ) );

  // cachedItems dont have Item.includes method, so new Item must be generated.
  if ( cachedItems ) {
    return cachedItems.map( function( cachedItem ) {
      var newItem = new inc.Item();
      newItem.properties = cachedItem.properties;
      return newItem;
    } );
  } else {
    return null;
  }
};

Model.prototype.loadUrl = function( url, settings ) {
  this.items = this._getCache();
  settings.success( this.items );

  $.ajax( url, {
    type: "GET",
    dataType: "jsonp",
    context: this,
  } ).done( function( data ) {
    this.items = this._itemsFromGoogleSheetsJson( data );
    localStorage.setItem( this._storeKeys.items, JSON.stringify( this.items ) );
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
      items[ cellRow ] = items[ cellRow ] || new inc.Item();
      property = new inc.Property( columnLabels[ cellCol ], cellData );

      items[ cellRow ].properties.push( property );
    }
  } );

  return items;
};

} )( window );

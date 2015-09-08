( function( root ) {

var _ = root._ = root._ || {};

var Property = _.Property = function( key, value ) {
  this.key = key;
  this.value = value;
};

var Item = _.Item = function() {
  this.properties = [];
};

Item.prototype.includes = function( keyword ) {
  return this.properties.some( function( property ) {
    return property.value.indexOf( keyword ) !== -1;
  } );
};

} )( window );

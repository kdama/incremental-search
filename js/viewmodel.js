( function( root ) {

var ko  = root.ko;
var inc = root.inc = root.inc || {};

var ViewModel = inc.ViewModel = function( url, model ) {
  this.url = ko.observable( url );
  this.keyword = ko.observable();
  this.errormsg = ko.observable();
  this.model = ko.observable( model );
  this.items = ko.observable( this.model().items );

  // if items-cache does not exist, load from url.
  if ( !this.model().items ) {
    this.loadUrl();
  }
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

} )( window );

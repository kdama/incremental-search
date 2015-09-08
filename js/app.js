( function( root ) {

var ko = root.ko;
var _  = root._ = root._ || {};

ko.applyBindings( new _.ViewModel( "https://spreadsheets.google.com/feeds/cells/1NH9rvVIudYRMMU4ETmRNdiTJQR36xCVYviVWjTEj5pM/1/public/values?alt=json", new _.Model() ) );

} )( window );

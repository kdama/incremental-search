( function( root ) {

var ko  = root.ko;
var inc = root.inc = root.inc || {};

ko.applyBindings( new inc.ViewModel( "https://spreadsheets.google.com/feeds/cells/1NH9rvVIudYRMMU4ETmRNdiTJQR36xCVYviVWjTEj5pM/1/public/values?alt=json", new inc.Model() ) );

} )( window );

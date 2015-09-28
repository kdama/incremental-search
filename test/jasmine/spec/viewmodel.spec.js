( function( root ) {

var inc = root.inc;

describe( "ViewModel", function() {
  var viewmodel;

  beforeEach( function() {
    viewmodel = new inc.ViewModel( "http://www.example.com/", new inc.Model() );
  } );

  it( "should be able to load a given url", function() {
    spyOn(viewmodel.model(), "loadUrl");

    viewmodel.loadUrl();

    expect( viewmodel.model().loadUrl.calls.any() ).toBe( true );
  } );

  describe( ".matches", function() {
    it( "should return true when the keyword is empty", function() {
      var item = new inc.Item();
      item.properties.push( new inc.Property( "Key", "Value" ) );

      viewmodel.keyword( "" );
      expect( viewmodel.matches( item ) ).toBe( true );

      viewmodel.keyword( null );
      expect( viewmodel.matches( item ) ).toBe( true );

      viewmodel.keyword( undefined );
      expect( viewmodel.matches( item ) ).toBe( true );
    } );

    it( "should return true when a given item matches the keyword", function() {
      var item = new inc.Item();
      item.properties.push( new inc.Property( "Key", "Value" ) );

      viewmodel.keyword( "Val" );
      expect( viewmodel.matches( item ) ).toBe( true );
    } );

    it( "should return false when a given item does not match the keyword", function() {
      var item = new inc.Item();
      item.properties.push( new inc.Property( "Key", "Value" ) );

      viewmodel.keyword( "val" );
      expect( viewmodel.matches( item ) ).toBe( false );
    } );
  } );
} );


} )( window );

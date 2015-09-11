( function( root ) {

var inc = root.inc;

describe( "Property", function() {
  var property;

  it( "should be able to have an ascii key and value", function() {
    property = new inc.Property( "Key", "Value" );
    expect( property.key ).toBe( "Key" );
    expect( property.value ).toBe( "Value" );
  } );

  it(" should be able to have a number key and value", function() {
    property = new inc.Property( "01", "-01" );
    expect( property.key ).toBe( "01" );
    expect( property.value ).toBe( "-01" );
  } );

  it( "should be able to have a japanese key and value", function() {
    property = new inc.Property( "キー", "値" );
    expect( property.key ).toBe( "キー" );
    expect( property.value ).toBe( "値" );
  } );

  it( "should be able to have a zero-length key and value", function() {
    property = new inc.Property( "", "" );
    expect( property.key ).toBe( "" );
    expect( property.value ).toBe( "" );
  } );

} );

} )( window );

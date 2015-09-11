( function( root ) {

var inc = root.inc;

describe( "Item", function() {
  var item;

  beforeEach( function() {
    item = new inc.Item();
    item.properties.push( new inc.Property( "Key", "Value" ) );
    item.properties.push( new inc.Property( "01", "-01" ) );
    item.properties.push( new inc.Property( "キー", "値" ) );
    item.properties.push( new inc.Property( "", "" ) );
  } );

  it( "should be able to ある値を含むことを調べる", function() {
    expect( item.includes( "Value" ) ).toBeTruthy();
    expect( item.includes( "-01" ) ).toBeTruthy();
    expect( item.includes( "値" ) ).toBeTruthy();
    expect( item.includes( "" ) ).toBeTruthy();
  } );

  it( "should be able to ある値を含まないことを調べる", function() {
    expect( item.includes( "value" ) ).toBeFalsy();
    expect( item.includes( "0-1" ) ).toBeFalsy();
    expect( item.includes( "あたい" ) ).toBeFalsy();
    expect( item.includes( null ) ).toBeFalsy();
    expect( item.includes( undefined ) ).toBeFalsy();
  } );
} );

} )( window );

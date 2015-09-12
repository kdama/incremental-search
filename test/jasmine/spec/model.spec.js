( function( root ) {

var $   = root.$;
var inc = root.inc;

/* Property */

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

/* Item */

describe( "Item", function() {
  var item;

  beforeEach( function() {
    item = new inc.Item();
    item.properties.push( new inc.Property( "Key", "Value" ) );
    item.properties.push( new inc.Property( "01", "-01" ) );
    item.properties.push( new inc.Property( "キー", "値" ) );
    item.properties.push( new inc.Property( "", "" ) );
  } );

  it( "should be able to push a given property", function() {
    expect( item.properties.length ).toBe( 4 );
  } );

  it( "should be able to check that some properties contains a given value", function() {
    expect( item.includes( "Value" ) ).toBe( true );
    expect( item.includes( "-01" ) ).toBe( true );
    expect( item.includes( "値" ) ).toBe( true );
    expect( item.includes( "" ) ).toBe( true );
  } );

  it( "should be able to check that some properties does not contain a given value", function() {
    expect( item.includes( "value" ) ).toBe( false );
    expect( item.includes( "0-1" ) ).toBe( false );
    expect( item.includes( "あたい" ) ).toBe( false );
    expect( item.includes( null ) ).toBe( false );
    expect( item.includes( undefined ) ).toBe( false );
  } );
} );

/* Model */

describe( "Model", function() {
  var model;

  beforeEach( function() {
    model = new inc.Model();
  } );

  it( "should be able to understand the google sheets json format", function() {
    spyOn($, "ajax").and.callFake( function () {
      var d = $.Deferred();
      d.resolve( {
        feed: {
          entry: [
            {
              gs$cell: {
                col: 1,
                row: 1,
                $t: "Name"
              }
            },
            {
              gs$cell: {
                col: 1,
                row: 2,
                $t: "Alice"
              }
            },
            {
              gs$cell: {
                col: 1,
                row: 3,
                $t: "Bob"
              }
            },
            {
              gs$cell: {
                col: 2,
                row: 1,
                $t: "Age"
              }
            },
            {
              gs$cell: {
                col: 2,
                row: 2,
                $t: "20"
              }
            },
            {
              gs$cell: {
                col: 2,
                row: 3,
                $t: "30"
              }
            },
          ]
        }
      } );
      return d.promise();
    } );

    model.loadUrl( "http://example.com/", {
      success: function( object ) {
        expect( JSON.stringify( object ) ).toBe( JSON.stringify(
          [
            {
              properties: [
                {
                  key: "Name",
                  value: "Alice"
                },
                {
                  key: "Age",
                  value: "20"
                }
              ]
            },
            {
              properties: [
                {
                  key: "Name",
                  value: "Bob"
                },
                {
                  key: "Age",
                  value: "30"
                }
              ]
            }
          ]
        ) );
      },
      error: function( object ) {
        fail( object );
      }
    } );
  } );
} );


} )( window );

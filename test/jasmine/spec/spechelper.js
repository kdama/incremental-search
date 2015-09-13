beforeEach( function () {
  var storage = {};

  spyOn( localStorage, "getItem" ).and.callFake( function ( key ) {
    return storage[ key ] || null;
  } );

  spyOn( localStorage, "setItem" ).and.callFake( function ( key, value ) {
    storage[ key ] = value + "";
  } );

  spyOn( $, "ajax" ).and.callFake( function () {
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
} );

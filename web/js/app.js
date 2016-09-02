
var App = angular.module('App', []);

App.controller('MainController', function ($scope, AppConfig, MusicService) {

  $scope.isLoading = true;

  MusicService.Init(function (data) {

    if (data.err) {
        alert(data.err);
        $scope.isLoading = false;
        return;
    }

    //reformat the data to be accepted by the datatable
    var arrayReturn = [], results = data.feed.entry;
    for (var i = 0, len = data.feed.entry.length; i < len; i++) {
        var result = results[i];
        arrayReturn.push([
          "<img src='" + result['im:image'][1]['label'] + "'>",
          i + 1,
          result['im:name']['label'],
          //result['im:artist']['label'],
          result['id']['label']
        ]);
    }

    //add the data to the datatable
    $('#datatable').DataTable( {
      responsive: true,
      data: arrayReturn
      ,columns: [
          { title: "", "width": "80px" },
          { title: "#", "width": "50px" },
          { title: "Album Name" },
          //{ title: "Artist" },
          { title: "id", className: "hide_column"}
          ,{"defaultContent": "<button type='button' class='btn btn-link'>more</button>"}
      ]
    });

    $scope.isLoading = false;
  });

  //launch a new tab with the details of the album
  $('#datatable').on( 'click', 'button', function () {
        var table = $('#datatable').DataTable();
        var row = $(this).closest('tr');
        var nRow = row[0];
        var data = table.row( nRow ).data();
        var win = window.open(data[3], '_blank');
        win.focus();
    } );

  //auto scroll the page to the top when the user interacts with pagination controls
  $('#datatable').on( 'order.dt',  function () { console.log('Order' ); } )
        .on( 'search.dt', function () {console.log('Search' ); } )
        .on( 'page.dt',   function () { $("html, body").animate({ scrollTop: 0 }, "slow"); } )

});

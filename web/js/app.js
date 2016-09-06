
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
          "<span class='chart-number'>" + (i + 1) + "</span>",
          result['im:name']['label'],
          //result['im:artist']['label'],
          result['id']['label']
        ]);
    }

    //add the data to the datatable
    $('#datatable').DataTable( {
      //responsive: true,
      pagingType: "simple",
      order: [[ 1, "asc" ]],
      data: arrayReturn
      ,columns: [
          { title: "", "width": "80px", "orderable": false },
          { title: "Position", "width": "30px" },
          { title: "Album", "width": "70%" },
          //{ title: "Artist" },
          { title: "id", className: "hide_column"}
          ,{"defaultContent": "<button type='button' class='btn btn-link'>buy now</button>", "orderable": false}
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

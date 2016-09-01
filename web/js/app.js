
var App = angular.module('App', []);

App.controller('MainController', function ($rootScope, $scope, $http, $sce, $window, $filter, AppConfig, MusicService) {

  MusicService.Init(function (data) {

      console.log(data);

      //reformat the data to be accepted by the datatable
      var arrayReturn = [], results = data.feed.entry;
      for (var i = 0, len = data.feed.entry.length; i < len; i++) {
          var result = results[i];
          arrayReturn.push([
            i + 1,
            "<img src='" + result['im:image'][0]['label'] + "'>",
            result['im:name']['label'],
            result['im:artist']['label']
          ]);
      }

      $('#datatable').DataTable( {
        responsive: true,
        data: arrayReturn
        ,columns: [
            { title: "Position" },
            { title: "" },
            { title: "Album Name" },
            { title: "Artist" }
        ]
    } );

  });

  $('#datatable').on('click', 'tr', function () {
      var table = $('#datatable').DataTable();
      console.log( table.row( this ).data() );
  });






});

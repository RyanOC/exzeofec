
var App = angular.module('App', []);

App.controller('MainController', function ($rootScope, $scope, $http, $sce, $window, $filter, AppConfig, MusicService) {

  MusicService.Init(function (data) {
      console.log(data);
  });

});

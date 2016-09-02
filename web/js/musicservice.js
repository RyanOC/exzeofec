
App.service('MusicService', function ($http, AppConfig) {
    this.Init = function (callback) {
        var url = AppConfig.getApiUrl();
        var res = $http.get(url);
        res.success(function (data, status, headers, config) {
            callback(data);
        });
        res.error(function (err, code) {
            callback({err:"error loading data"});
        });
    };
});

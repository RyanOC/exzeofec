App.provider('AppConfig', function () {

    this.aplurl = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

    this.$get = function () {
        var aplurl = this.aplurl;
        return {
            getApiUrl: function () {
                return aplurl
            }
        }
    };
});

var app = angular.module('TwitWrangler', []);

app.factory('GetTweetsFactory', function($http) {
  return {
    getTweets: function(handle) {
      var queryStringParams = {};
      if (handle) {
        queryStringParams.handle = handle;
      }
      return $http.get('/tweets', {
        params: queryStringParams
      }).then(function(response) {
        return response.data;
      });
    }
  };
});

app.controller('GetTweetsController', function($scope, GetTweetsFactory) {
  $scope.search = {};
  $scope.getTweets = function(handle) {
    GetTweetsFactory.getTweets(handle).then(function(tweets) {
      $scope.tweets = tweets;
      $scope.search = {};
    });
  };
});
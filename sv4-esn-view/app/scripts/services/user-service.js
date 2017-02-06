angular
    .module('fseChatClientApp')
    .factory('userService', ['$rootScope', '$filter', '$http', function ($rootScope, $filter, $http) {
        function UserService($scope) {
            this.$scope = $scope;

            this.apiUrl = "http://localhost:3000/";

        }

        UserService.prototype.retrieveOnlineUsers = function (callback) {
            $http.get(this.apiUrl + "users").then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(error, status, headers, config) {
                console.log('Error retrieving users: ' + error);
            });
        };

        return UserService;

    }]);

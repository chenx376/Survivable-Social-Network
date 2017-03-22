export var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["Undefined"] = 0] = "Undefined";
    UserStatus[UserStatus["OK"] = 1] = "OK";
    UserStatus[UserStatus["Help"] = 2] = "Help";
    UserStatus[UserStatus["Emergency"] = 3] = "Emergency";
})(UserStatus || (UserStatus = {}));
var User = (function () {
    function User(json) {
        var _this = this;
        this.status = UserStatus.Undefined;
        this.online = false;
        this.userStatusString = function () {
            switch (_this.status) {
                case UserStatus.Undefined: return 'Undefined';
                case UserStatus.OK: return 'OK';
                case UserStatus.Help: return 'Help';
                case UserStatus.Emergency: return 'Emergency';
            }
        };
        this.userId = json._id;
        this.username = json.username;
        this.status = json.status;
        this.statusInformation = json.status_information;
        this.online = json.online;
    }
    return User;
}());
export { User };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/models/user.model.js.map
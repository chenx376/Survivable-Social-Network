import { User } from './user.model';
var Message = (function () {
    function Message(json) {
        this.messageId = json._id;
        this.sender = new User(json.sender);
        this.receiver = json.receiver;
        this.content = json.message;
        this.date = new Date(json.sent_at);
        this.broadcast = json.broadcast;
        this.userStatus = json.user_status;
        this.userStatusInformation = json.user_status_information;
    }
    return Message;
}());
export { Message };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/models/message.model.js.map
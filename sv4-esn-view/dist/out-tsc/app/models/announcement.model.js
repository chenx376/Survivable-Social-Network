import { User } from './user.model';
var Announcement = (function () {
    function Announcement(json) {
        this.announcementId = json._id;
        this.content = json.content;
        this.date = new Date(json.created_at);
        this.publisher = new User(json.announcer);
    }
    return Announcement;
}());
export { Announcement };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/models/announcement.model.js.map
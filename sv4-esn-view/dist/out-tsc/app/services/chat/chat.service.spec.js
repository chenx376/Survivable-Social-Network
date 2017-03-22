import { TestBed, inject } from '@angular/core/testing';
import { ChatService } from './chat.service';
describe('UserService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [ChatService]
        });
    });
    it('should ...', inject([ChatService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/services/chat/chat.service.spec.js.map
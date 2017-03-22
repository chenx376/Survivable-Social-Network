import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
describe('UserService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });
    it('should ...', inject([UserService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/services/user/user.service.spec.js.map
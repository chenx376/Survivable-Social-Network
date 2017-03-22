import { TestBed, inject } from '@angular/core/testing';
import { HttpService } from './http.service';
describe('HttpService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [HttpService]
        });
    });
    it('should ...', inject([HttpService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/services/http/http.service.spec.js.map
import { async, TestBed } from '@angular/core/testing';
import { ShareStatusComponent } from './share-status.component';
describe('ShareStatusComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ShareStatusComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ShareStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/components/share-status/share-status.component.spec.js.map
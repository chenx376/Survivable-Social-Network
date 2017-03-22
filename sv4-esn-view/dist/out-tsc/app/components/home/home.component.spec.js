import { async, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
describe('HomeComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [HomeComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/components/home/home.component.spec.js.map
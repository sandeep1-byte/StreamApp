import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpcomponentComponent } from './otpcomponent.component';

describe('OtpcomponentComponent', () => {
  let component: OtpcomponentComponent;
  let fixture: ComponentFixture<OtpcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

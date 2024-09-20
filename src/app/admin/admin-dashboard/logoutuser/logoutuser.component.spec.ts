import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutuserComponent } from './logoutuser.component';

describe('LogoutuserComponent', () => {
  let component: LogoutuserComponent;
  let fixture: ComponentFixture<LogoutuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

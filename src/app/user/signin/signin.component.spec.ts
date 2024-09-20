import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './signin.component';
import { RouterOutlet } from '@angular/router';

describe('SigninComponent', () => {
  let component: SignInComponent ;
  let fixture: ComponentFixture<SignInComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent,RouterOutlet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

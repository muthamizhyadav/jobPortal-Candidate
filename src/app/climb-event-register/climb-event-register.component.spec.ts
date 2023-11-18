import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimbEventRegisterComponent } from './climb-event-register.component';

describe('ClimbEventRegisterComponent', () => {
  let component: ClimbEventRegisterComponent;
  let fixture: ComponentFixture<ClimbEventRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimbEventRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimbEventRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

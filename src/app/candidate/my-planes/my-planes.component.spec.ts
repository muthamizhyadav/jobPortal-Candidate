import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlanesComponent } from './my-planes.component';

describe('MyPlanesComponent', () => {
  let component: MyPlanesComponent;
  let fixture: ComponentFixture<MyPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlanesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

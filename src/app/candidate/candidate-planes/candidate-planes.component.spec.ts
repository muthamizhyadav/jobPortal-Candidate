import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePlanesComponent } from './candidate-planes.component';

describe('CandidatePlanesComponent', () => {
  let component: CandidatePlanesComponent;
  let fixture: ComponentFixture<CandidatePlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatePlanesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatePlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

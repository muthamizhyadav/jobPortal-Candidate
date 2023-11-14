import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStreamsComponent } from './request-streams.component';

describe('RequestStreamsComponent', () => {
  let component: RequestStreamsComponent;
  let fixture: ComponentFixture<RequestStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestStreamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

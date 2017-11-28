import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSavedComponent } from './event-saved.component';

describe('EventSavedComponent', () => {
  let component: EventSavedComponent;
  let fixture: ComponentFixture<EventSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

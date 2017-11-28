import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearchedComponent } from './event-searched.component';

describe('EventSearchedComponent', () => {
  let component: EventSearchedComponent;
  let fixture: ComponentFixture<EventSearchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSearchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

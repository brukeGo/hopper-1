import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredEventsComponent } from './filtered-events.component';

describe('FilteredEventsComponent', () => {
  let component: FilteredEventsComponent;
  let fixture: ComponentFixture<FilteredEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

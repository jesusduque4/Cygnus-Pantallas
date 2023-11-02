import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataZoneComponent } from './data-zone.component';

describe('DataZoneComponent', () => {
  let component: DataZoneComponent;
  let fixture: ComponentFixture<DataZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

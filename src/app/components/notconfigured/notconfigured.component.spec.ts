import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotconfiguredComponent } from './notconfigured.component';

describe('NotconfiguredComponent', () => {
  let component: NotconfiguredComponent;
  let fixture: ComponentFixture<NotconfiguredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotconfiguredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotconfiguredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

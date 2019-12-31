import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeBerlinComponent } from './be-berlin.component';

describe('BeBerlinComponent', () => {
  let component: BeBerlinComponent;
  let fixture: ComponentFixture<BeBerlinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeBerlinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeBerlinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

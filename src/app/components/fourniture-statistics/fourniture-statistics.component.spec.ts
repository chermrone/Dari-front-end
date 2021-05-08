import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournitureStatisticsComponent } from './fourniture-statistics.component';

describe('FournitureStatisticsComponent', () => {
  let component: FournitureStatisticsComponent;
  let fixture: ComponentFixture<FournitureStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournitureStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournitureStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FounitureAdComponent } from './founiture-ad.component';

describe('FounitureAdComponent', () => {
  let component: FounitureAdComponent;
  let fixture: ComponentFixture<FounitureAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FounitureAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FounitureAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

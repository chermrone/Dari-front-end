import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournitureAdCheckoutComponent } from './fourniture-ad-checkout.component';

describe('FournitureAdCheckoutComponent', () => {
  let component: FournitureAdCheckoutComponent;
  let fixture: ComponentFixture<FournitureAdCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournitureAdCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournitureAdCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

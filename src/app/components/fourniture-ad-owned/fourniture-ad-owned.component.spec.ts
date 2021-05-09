import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournitureAdOwnedComponent } from './fourniture-ad-owned.component';

describe('FournitureAdOwnedComponent', () => {
  let component: FournitureAdOwnedComponent;
  let fixture: ComponentFixture<FournitureAdOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournitureAdOwnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournitureAdOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

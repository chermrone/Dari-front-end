import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFournitureAdComponent } from './add-fourniture-ad.component';

describe('AddFournitureAdComponent', () => {
  let component: AddFournitureAdComponent;
  let fixture: ComponentFixture<AddFournitureAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFournitureAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFournitureAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifFournitureAdComponent } from './modif-fourniture-ad.component';

describe('ModifFournitureAdComponent', () => {
  let component: ModifFournitureAdComponent;
  let fixture: ComponentFixture<ModifFournitureAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifFournitureAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifFournitureAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

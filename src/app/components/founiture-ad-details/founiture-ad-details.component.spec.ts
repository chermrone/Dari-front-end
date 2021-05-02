import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FounitureAdDetailsComponent } from './founiture-ad-details.component';

describe('FounitureAdDetailsComponent', () => {
  let component: FounitureAdDetailsComponent;
  let fixture: ComponentFixture<FounitureAdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FounitureAdDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FounitureAdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

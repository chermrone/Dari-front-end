import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdOwnedComponent } from './ad-owned.component';

describe('AdOwnedComponent', () => {
  let component: AdOwnedComponent;
  let fixture: ComponentFixture<AdOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdOwnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

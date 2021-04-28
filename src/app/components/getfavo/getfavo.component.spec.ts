import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetfavoComponent } from './getfavo.component';

describe('GetfavoComponent', () => {
  let component: GetfavoComponent;
  let fixture: ComponentFixture<GetfavoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetfavoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetfavoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

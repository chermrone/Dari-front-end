import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstchatComponent } from './firstchat.component';

describe('FirstchatComponent', () => {
  let component: FirstchatComponent;
  let fixture: ComponentFixture<FirstchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

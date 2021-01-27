import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WyslanoEmailWeryfikacyjnyComponent } from './wyslano-email-weryfikacyjny.component';

describe('WyslanoEmailWeryfikacyjnyComponent', () => {
  let component: WyslanoEmailWeryfikacyjnyComponent;
  let fixture: ComponentFixture<WyslanoEmailWeryfikacyjnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WyslanoEmailWeryfikacyjnyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WyslanoEmailWeryfikacyjnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

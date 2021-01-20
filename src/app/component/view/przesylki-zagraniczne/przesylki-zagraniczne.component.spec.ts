import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzesylkiZagraniczneComponent } from './przesylki-zagraniczne.component';

describe('PrzesylkiZagraniczneComponent', () => {
  let component: PrzesylkiZagraniczneComponent;
  let fixture: ComponentFixture<PrzesylkiZagraniczneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrzesylkiZagraniczneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzesylkiZagraniczneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

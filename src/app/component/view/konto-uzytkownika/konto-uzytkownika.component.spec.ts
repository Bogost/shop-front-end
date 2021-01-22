import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoUzytkownikaComponent } from './konto-uzytkownika.component';

describe('KontoUzytkownikaComponent', () => {
  let component: KontoUzytkownikaComponent;
  let fixture: ComponentFixture<KontoUzytkownikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontoUzytkownikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoUzytkownikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

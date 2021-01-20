import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacjeOFirmieComponent } from './informacje-o-firmie.component';

describe('InformacjeOFirmieComponent', () => {
  let component: InformacjeOFirmieComponent;
  let fixture: ComponentFixture<InformacjeOFirmieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacjeOFirmieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacjeOFirmieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

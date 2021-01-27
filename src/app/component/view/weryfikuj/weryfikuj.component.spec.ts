import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeryfikujComponent } from './weryfikuj.component';

describe('WeryfikujComponent', () => {
  let component: WeryfikujComponent;
  let fixture: ComponentFixture<WeryfikujComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeryfikujComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeryfikujComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

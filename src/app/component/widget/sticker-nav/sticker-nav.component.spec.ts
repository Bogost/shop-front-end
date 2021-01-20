import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerNavComponent } from './sticker-nav.component';

describe('StickerNavComponent', () => {
  let component: StickerNavComponent;
  let fixture: ComponentFixture<StickerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

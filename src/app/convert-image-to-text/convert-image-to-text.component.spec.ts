import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertImageToTextComponent } from './convert-image-to-text.component';

describe('ConvertImageToTextComponent', () => {
  let component: ConvertImageToTextComponent;
  let fixture: ComponentFixture<ConvertImageToTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertImageToTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertImageToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

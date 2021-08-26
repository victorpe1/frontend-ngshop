import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaBannerComponent } from './categoria-banner.component';

describe('CategoriaBannerComponent', () => {
  let component: CategoriaBannerComponent;
  let fixture: ComponentFixture<CategoriaBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

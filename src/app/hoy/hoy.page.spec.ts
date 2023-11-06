import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HoyPage } from './hoy.page';

describe('HoyPage', () => {
  let component: HoyPage;
  let fixture: ComponentFixture<HoyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

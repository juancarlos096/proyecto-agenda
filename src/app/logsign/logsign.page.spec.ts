import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogsignPage } from './logsign.page';

describe('LogsignPage', () => {
  let component: LogsignPage;
  let fixture: ComponentFixture<LogsignPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogsignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

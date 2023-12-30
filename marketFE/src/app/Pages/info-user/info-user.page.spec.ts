import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoUserPage } from './info-user.page';

describe('InfoUserPage', () => {
  let component: InfoUserPage;
  let fixture: ComponentFixture<InfoUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

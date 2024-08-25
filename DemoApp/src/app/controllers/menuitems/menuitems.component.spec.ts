import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemsComponent } from './menuitems.component';

describe('MenuitemsComponent', () => {
  let component: MenuitemsComponent;
  let fixture: ComponentFixture<MenuitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyjobComponent } from './modifyjob.component';

describe('ModifyjobComponent', () => {
  let component: ModifyjobComponent;
  let fixture: ComponentFixture<ModifyjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

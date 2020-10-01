import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyareaComponent } from './modifyarea.component';

describe('ModifyareaComponent', () => {
  let component: ModifyareaComponent;
  let fixture: ComponentFixture<ModifyareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

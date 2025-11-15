import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelUsuarioComponent } from './del-usuario.component';

describe('DelUsuarioComponent', () => {
  let component: DelUsuarioComponent;
  let fixture: ComponentFixture<DelUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

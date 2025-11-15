import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReUsuarioComponent } from './re-usuario.component';

describe('ReUsuarioComponent', () => {
  let component: ReUsuarioComponent;
  let fixture: ComponentFixture<ReUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

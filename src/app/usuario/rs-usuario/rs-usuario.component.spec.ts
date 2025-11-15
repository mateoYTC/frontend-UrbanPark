import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsUsuarioComponent } from './rs-usuario.component';

describe('RsUsuarioComponent', () => {
  let component: RsUsuarioComponent;
  let fixture: ComponentFixture<RsUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RsUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

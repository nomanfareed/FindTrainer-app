import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertsItemComponent } from './certs-item.component';

describe('CertsItemComponent', () => {
  let component: CertsItemComponent;
  let fixture: ComponentFixture<CertsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

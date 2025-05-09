import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParInstitutComponent } from './recherche-par-institut.component';

describe('RechercheParInstitutComponent', () => {
  let component: RechercheParInstitutComponent;
  let fixture: ComponentFixture<RechercheParInstitutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheParInstitutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheParInstitutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

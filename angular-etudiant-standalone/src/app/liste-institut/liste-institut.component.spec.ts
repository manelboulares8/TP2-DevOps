import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeInstitutComponent } from './liste-institut.component';

describe('ListeInstitutComponent', () => {
  let component: ListeInstitutComponent;
  let fixture: ComponentFixture<ListeInstitutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeInstitutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeInstitutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

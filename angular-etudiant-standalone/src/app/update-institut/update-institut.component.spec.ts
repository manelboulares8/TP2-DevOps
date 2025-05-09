import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstitutComponent } from './update-institut.component';

describe('UpdateInstitutComponent', () => {
  let component: UpdateInstitutComponent;
  let fixture: ComponentFixture<UpdateInstitutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInstitutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInstitutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

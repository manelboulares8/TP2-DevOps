import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { etudiantsGuard } from './etudiant.guard';

describe('etudiantsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => etudiantsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

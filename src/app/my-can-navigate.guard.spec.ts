import { TestBed, async, inject } from '@angular/core/testing';

import { MyCanNavigateGuard } from './my-can-navigate.guard';

describe('MyCanNavigateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCanNavigateGuard]
    });
  });

  it('should ...', inject([MyCanNavigateGuard], (guard: MyCanNavigateGuard) => {
    expect(guard).toBeTruthy();
  }));
});

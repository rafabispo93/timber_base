import { TestBed } from '@angular/core/testing';

import { InvoicesAppService } from './invoices-app.service';

describe('InvoicesAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoicesAppService = TestBed.get(InvoicesAppService);
    expect(service).toBeTruthy();
  });
});

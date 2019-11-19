import { TestBed } from '@angular/core/testing';

import { ChunkService } from './chunk.service';

describe('ChunkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChunkService = TestBed.get(ChunkService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { SetService } from './set.service';
import { HttpClient } from '@angular/common/http';
import { Set } from '../interfaces/set';
import { of } from 'rxjs';
import { Block } from '@angular/compiler';

describe('SetService', () => {
  let service: SetService;

  const returnedSets: { sets: Partial<Set>[] } = {
    sets: [{ name: 'test' }],
  };
  const httpMock = {
    get: jasmine.createSpy().and.returnValue(of(returnedSets)),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpMock }],
    });
    service = TestBed.inject(SetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buscarSets', () => {
    it('Deve buscar sets via metodo get na api', () => {
      const params = { name: 'test', block: 'test' };
      service.buscarSets(params).subscribe((sets) => {
        expect(httpMock.get).toHaveBeenCalledWith(
          `https://api.magicthegathering.io/v1/sets`,
          { params }
        );
        expect(sets).toEqual(returnedSets.sets as Set[]);
      });
    });
  });
});

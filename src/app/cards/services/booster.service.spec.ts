import { TestBed } from '@angular/core/testing';
import { BoosterService } from './booster.service';
import { HttpClient } from '@angular/common/http';
import { Card } from '../interfaces/card';
import { of } from 'rxjs';

describe('BoosterService', () => {
  let service: BoosterService;

  const returnedCards: { cards: Partial<Card>[] } = {
    cards: [{ name: 'test', types: ['Creature'] }],
  };
  const httpMock = {
    get: jasmine.createSpy().and.returnValue(of(returnedCards)),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpMock }],
    });
    service = TestBed.inject(BoosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('buscarCards', () => {

    it('Deve buscar cards via metodo get na api', () => {
      service.buscarCards('1').subscribe((cards) => {
        expect(httpMock.get).toHaveBeenCalledWith(
          'https://api.magicthegathering.io/v1/sets/1/booster'
        );
        expect(cards).toEqual(returnedCards.cards as Card[]);
      });
    });
  });
});

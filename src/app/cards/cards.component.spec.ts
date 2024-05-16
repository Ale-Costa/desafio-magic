import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from './cards.component';
import { ActivatedRoute } from '@angular/router';
import { BoosterService } from './services/booster.service';
import { Subject } from 'rxjs';
import { Card } from './interfaces/card';
import { CardListComponent } from './card-list/card-list.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  const activatedRouteMock = {
    snapshot: { paramMap: { get: () => '1' } },
  };

  const buscarCards$: Subject<Partial<Card>[]> = new Subject();
  const boosterServiceMock = {
    buscarCards: jasmine.createSpy().and.returnValue(buscarCards$),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent, CardListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        { provide: BoosterService, useValue: boosterServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('buscarCards', () => {
    it('Deve pegar o id da colecao e buscar as cartas', () => {
      expect(boosterServiceMock.buscarCards).toHaveBeenCalledWith('1');
    });

    describe('Quando retornar as cartas com sucesso', () => {
      it('Deve filtrar as cartas pelo type Creature', () => {
        buscarCards$.next([
          { name: 'test', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test2', types: ['Other'] , colorIdentity: ['W'] },
        ]);
        expect(component.loading).toBe(true);
        expect(component.cardsValidos.length).toBe(1);
      });

      it('Deve renderizar as cartas ao usuario quando houver 30 cartas', () => {
        buscarCards$.next([
          { name: 'test1', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test2', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test3', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test4', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test5', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test6', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test7', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test8', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test9', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test10', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test11', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test12', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test13', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test14', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test15', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test16', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test17', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test18', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test19', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test20', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test21', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test22', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test23', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test24', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test25', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test26', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test27', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test28', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test29', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test30', types: ['Creature'], colorIdentity: ['W'] },
        ]);
        component.loading = false;

        fixture.detectChanges();
        const appCardList = fixture.nativeElement as HTMLElement;
        expect(appCardList.querySelector('app-card-list')).toBeTruthy();
      });

      it('Nao deve renderizar as cartas ao usuario quando houver menos de 30 cartas', () => {
        buscarCards$.next([
          { name: 'test1', types: ['Creature'], colorIdentity: ['W'] },
          { name: 'test2', types: ['Creature'], colorIdentity: [' W'] },
          { name: 'test3', types: ['Creature'], colorIdentity: [' W'] },
        ]);
        fixture.detectChanges();

        const appCardList = fixture.nativeElement as HTMLElement;
        expect(appCardList.querySelector('app-card-list')).toBeFalsy();
        expect(component.cardsValidos.length).toBe(3);
      });
    });
  });

  describe('removerCards', () => {
    it('Deve remover os cards selecionados', () => {
      component.cardsValidos = [
        { id: '1', name: 'test1', types: ['Creature'] } as Card,
        { id: '2', name: 'test2', types: ['Creature'] } as Card,
        { id: '3', name: 'test3', types: ['Creature'] } as Card,
      ];
      const cardsRemovidos = [
        { id: '1', name: 'test1', types: ['Creature'] },
        { id: '3', name: 'test3', types: ['Creature'] },
      ] as Card[];
      component.removerCards(cardsRemovidos);

      expect(boosterServiceMock.buscarCards).toHaveBeenCalledWith('1');
      expect(component.cardsValidos.length).toBe(1);
    });
  });
});

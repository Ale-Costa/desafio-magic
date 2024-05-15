import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SetService } from './services/set.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject, of } from 'rxjs';
import { Set } from './interfaces/set';
import { SetListComponent } from './set-list/set-list.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const buscarSets$: Subject<Partial<Set>[]> = new Subject();

  const setServiceMock = {
    buscarSets: jasmine.createSpy().and.returnValue(buscarSets$),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule, SetListComponent],
      providers: [{ provide: SetService, useValue: setServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.sets$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('buscarSets', () => {
    it('deve buscar sets no service', () => {
      component.buscarSets();
      expect(component.loading).toBe(true);
      expect(setServiceMock.buscarSets).toHaveBeenCalled();
    });

    it('deve renderizar os sets', () => {
      buscarSets$.next([
        { name: 'test', block: 'test', releaseDate: new Date() },
      ]);
      component.sets$.subscribe();
      fixture.detectChanges();

      const appSetList = fixture.nativeElement as HTMLElement;
      expect(component.loading).toBe(false);
      expect(appSetList.querySelector('app-set-list')).toBeTruthy();
    });
  });
});

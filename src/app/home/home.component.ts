import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SetService } from './services/set.service';
import { Observable, finalize, map, catchError, EMPTY } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SetListComponent } from './set-list/set-list.component';
import { Set } from './interfaces/set';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SetListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  blocks: string[] = ['Amonkhet', 'Ixalan', 'Zendikar', 'Ravnica', 'Onslaught'];

  filtersForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    block: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  sets$: Observable<Set[]>;

  loading = false;

  constructor(
    private readonly setService: SetService,
    private readonly matSnackBar: MatSnackBar
  ) {}

  buscarSets(): void {
    this.loading = true;

    const regex = /^[^\d]{0,3}$/;
    const { name, block } = this.filtersForm.getRawValue();

    this.sets$ = this.setService.buscarSets({ name, block }).pipe(
      map((sets) => sets.filter((set) => regex.test(set.code))),
      finalize(() => (this.loading = false)),
      catchError((err) => {
        this.matSnackBar.open(err.error, 'Ok', {
          duration: 5000,
          horizontalPosition: 'left',
        });
        return EMPTY;
      })
    );
  }
}

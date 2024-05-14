import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SetService } from './services/set.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SetListComponent } from './set-list/set-list.component';
import { Set } from './interfaces/set';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    AsyncPipe,
    JsonPipe,
    SetListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  blocks: string[] = ['Amonkhet', 'Ixalan', 'Zendikar', 'Ravnica', 'Onslaught'];

  filtersForm = new FormGroup({
    name: new FormControl<string | undefined>('', { nonNullable: true }),
    block: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  sets$: Observable<Set[]>;

  constructor(private readonly setService: SetService) {}

  buscarSets(): void {
    const { name, block } = this.filtersForm.getRawValue();

    this.sets$ = this.setService.getSets({ name, block });
  }
}

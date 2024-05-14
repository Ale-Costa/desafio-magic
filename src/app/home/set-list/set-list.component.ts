import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Set } from '../interfaces/set';

@Component({
  selector: 'app-set-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, JsonPipe],
  templateUrl: './set-list.component.html',
  styleUrl: './set-list.component.scss',
})
export class SetListComponent {
  @Input()
  sets: Set[];

  constructor(readonly router: Router) {}

}

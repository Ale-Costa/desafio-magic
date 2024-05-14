import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Set } from '../../../shared';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

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

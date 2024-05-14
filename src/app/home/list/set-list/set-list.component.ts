import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardSet } from '../../../shared';

@Component({
  selector: 'app-set-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './set-list.component.html',
  styleUrl: './set-list.component.scss',
})
export class SetListComponent {
  cardSet = input<CardSet>();
}

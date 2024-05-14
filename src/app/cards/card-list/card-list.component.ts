import { Component, Input } from '@angular/core';
import { Card } from '../interfaces/card';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  @Input()
  cards: Card[]
}

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

  colorIdentityImages: { [key: string]: string } = {
    U: '../../../assets/img/U.webp',
    B: '../../../assets/img/B.png',
    R: '../../../assets/img/R.webp',
    G: '../../../assets/img/G.png',
  };

}

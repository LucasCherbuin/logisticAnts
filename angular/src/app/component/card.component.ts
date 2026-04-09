import { Component, Input } from '@angular/core';
import { Produit } from '../models/produit.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./main.scss']
})
export class CardComponent {
  @Input() produit!: Produit;
}
import { Component, Input } from '@angular/core';
import { Produit } from '../models/produit.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './client/card.component.html',
  styleUrls: ['./main.scss'],
  standalone: true,
  imports: [CommonModule]  
})
export class CardComponent {
  @Input() produit!: Produit;
}
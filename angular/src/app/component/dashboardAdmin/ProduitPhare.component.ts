import { OnInit, Component } from '@angular/core';
import { AdminDashboardService } from '../../services/adminDashboard.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-produit-phare',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: '../../pages/admin/produitPhare.component.html',
  styleUrls: ['../../../main.scss'],
})
export class ProduitPhareComponent implements OnInit {
  produit: any[] = [];
  achats: number = 0;
  filterfcvar = new FormControl('');
  filteredProduitPhare$!: Observable<any[]>;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.adminDashboardService.getAllProduitPhareDashboard().subscribe(data => {
      this.produit = data.produits;
      this.achats = data.achats;
      this.filteredProduitPhare$ = this.filterfcvar.valueChanges.pipe(
        startWith(''),
        map(critere => this.sortProduits(critere))
      );
    });
  }

  private sortProduits(critere: string | null): any[] {
      if (critere === 'achat') {
          return [...this.produit].sort((a, b) => a.achat - b.achat);
      }
      return [...this.produit].sort((a, b) => String(a.produit).localeCompare(String(b.produit)));
  }
}
import { OnInit, Component } from '@angular/core';
import { AdminDashboardService } from '../../services/adminDashboard.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
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
  filterField = new FormControl<string>('produit');
  filteredProduitPhare$!: Observable<any[]>;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.adminDashboardService.getAllProduitPhareDashboard().subscribe(data => {
      this.produit = data.produits;
      this.achats = data.achats;
      this.filteredProduitPhare$ = combineLatest([
        this.filterfcvar.valueChanges.pipe(startWith('')),
        this.filterField.valueChanges.pipe(startWith('produit'))
      ]).pipe(
        map(([value, field]) => this.filterProduits(value ?? '', field ?? 'produit'))
      );
    });
  }

  private filterProduits(value: string, field: string): any[] {
      const term = value.toLowerCase();
      const filtered = term
        ? this.produit.filter(p => String(p[field]).toLowerCase().includes(term))
        : [...this.produit];
      return field === 'achat'
        ? filtered.sort((a, b) => a.achat - b.achat)
        : filtered.sort((a, b) => String(a.produit).localeCompare(String(b.produit)));
  }
}
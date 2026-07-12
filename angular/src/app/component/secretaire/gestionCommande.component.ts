import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommandeService } from "../../services/commande.service";
import { Commande } from "../../models/commande.model";
import { ArticleCommandeService } from "../../services/articleCommande.service";
import { ArticleCommande } from "../../models/articleCommande.model";
import { Produit } from "../../models/produit.model";
import { ProduitService } from "../../services/produit.service";
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Prix } from '../../models/nosql/prix.model';
import { AdminDashboardService } from '../../services/adminDashboard.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MailService } from '../../services/mailer.service';
import { DeleteCommandeComponentSecretaire } from "./deleteCommandeSecretaire.component";
@Component({
    selector: 'app-gestion-commande',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, DeleteCommandeComponentSecretaire],
    templateUrl: '../../pages/secretaire/gestion/gestionCommande.component.html',
    styleUrls: ['../../../main.scss'],
})
export class GestionCommandeComponent implements OnInit {
    commandes: Commande[] = [];
    articleCommandes: ArticleCommande[] = [];
    produits: Produit[] = [];
    user!: User;
    filterfcvar = new FormControl('');
    filteredCommande$!: Observable<Commande[]>;
    currentCommande: Commande | null = null;
    currentIndex = -1;
    commandeIdASupprimer!: number;

    @ViewChild('confirmDialog') confirmDialog!: DeleteCommandeComponentSecretaire;

    constructor(
        private commandeService: CommandeService,
        private articleCommandeService: ArticleCommandeService,
        private produitService: ProduitService,
        private userService: UserService,
        private mailService: MailService,
        private adminDashboardService: AdminDashboardService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadCommandes();
        this.loadArticleCommandes();
        this.loadProduits();
        this.loadUser();

        this.filteredCommande$ = this.filterfcvar.valueChanges.pipe(
            startWith(''),
            switchMap(value => value
                ? this.commandeService.searchCommandes(value)
                : this.commandeService.getCommandes()
            )
        );
    }

    loadCommandes(): void {
        this.commandeService.getCommandes().subscribe({
            next: (data: Commande[]) => {
                this.commandes = data;
                this.cdr.detectChanges();
            },
            error: (error: any) => { console.error("Error fetching commandes:", error); }
        });
    }

    loadArticleCommandes(): void {
        this.articleCommandeService.getArticleCommandes().subscribe({
            next: (data: ArticleCommande[]) => { this.articleCommandes = data; },
            error: (error: any) => { console.error("Error fetching articleCommandes:", error); }
        });
    }

    loadProduits(): void {
        this.produitService.getProduits().subscribe({
            next: (data: Produit[]) => { this.produits = data; },
            error: (error: any) => { console.error("Error fetching produits:", error); }
        });
    }

    loadUser(): void {
        this.userService.getUsers().subscribe({
            next: (data: User[]) => { this.user = data[0]; },
            error: (error: any) => { console.error('Error fetching user:', error); }
        });
    }

    setCurrentAntrag(commande: Commande, index: number): void {
        this.currentCommande = commande;
        this.currentIndex = index;
    }
    
}
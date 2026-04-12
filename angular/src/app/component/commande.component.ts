import { OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Commande } from '../models/commande.model';


    export class CommandeComponent implements OnInit {

    commandes: Commande[] = [];
    searchTerm: string = '';

        constructor(private commandeService: CommandeService) {}

        ngOnInit(): void {
            this.loadCommandes();
        }

        loadCommandes(): void {
        this.commandeService.getCommandes().subscribe(
            (data: Commande[]) => {
            this.commandes = data;
            },
            (error: any) => {
            console.error('Error fetching commandes:', error);
            }
        );
    }   

    onSearch() {
        if (this.searchTerm.trim() === '') {
            this.loadCommandes();
        } else {
            this.commandeService.searchCommande(this.searchTerm).subscribe(data => {
                this.commandes = data;
            }); 
        }
    }
}
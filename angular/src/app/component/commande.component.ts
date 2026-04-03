import { OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Commande } from '../models/commande.model';


@Component({
  selector: 'commande',
  templateUrl: './commande.component.html',
  styleUrls: ['mains.css']
})

    export class CommandeComponent implements OnInit {
    commandes: Commande[] = [];

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
}
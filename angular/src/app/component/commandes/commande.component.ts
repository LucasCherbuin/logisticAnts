import { OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/commande.model';
import { startWith, Observable} from 'rxjs';

    @Component({
        selector: 'app-tableau-commande',
        templateUrl: './tableauCommande.component.html',
        styleUrls: ['./main.scss']
    })

    export class CommandeComponent implements OnInit {

    commandes: Commande[] = [];
    searchTerm: string = '';
    filteredCommande$!: Observable<Commande[]>;

        constructor(private commandeService: CommandeService ) {}

        ngOnInit(): void {
            this.filteredCommande$ = this.filterfcvar.valueChanges.pipe(
                startWith(''),
                map(text => this.search(text || ''))
            );
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

        Onsearch(text: string): Commande[] {
            const term = text.toLowerCase();

            return this.commandes.filter(commande =>
                commande.id().includes(term) ||
                commande.userId().includes(term)
            );
            }
        }
}
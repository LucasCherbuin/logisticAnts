import { OnInit } from '@angular/core';
import { ArticleCommandeService } from '../services/articleCommande.service';
import { ArticleCommande } from '../models/articleCommande.model';


    export class ArticleCommandeComponent implements OnInit {
    articleCommandes: ArticleCommande[] = [];

        constructor(private articleCommandeService: ArticleCommandeService) {}

        ngOnInit(): void {
            this.loadArticleCommandes();
        }

    loadArticleCommandes(): void {
    this.articleCommandeService.getArticleCommandes().subscribe(
        (data: ArticleCommande[]) => {
        this.articleCommandes = data;
        },
        (error: any) => {
        console.error('Error fetching article commandes:', error);
        }
    );
    }   
}
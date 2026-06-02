package com.maven.seeder;

import com.maven.model.ArticleCommande;
import com.maven.repository.ArticleCommandeRepository;

import org.springframework.stereotype.Component;

@Component
public class ArticleCommandeSeeder {
    private final ArticleCommandeRepository articleCommandeRepository;

    public ArticleCommandeSeeder(ArticleCommandeRepository articleCommandeRepository) {
        this.articleCommandeRepository = articleCommandeRepository;
    }

    public void seedArticleCommandes() {
        if (articleCommandeRepository.count() == 0) {
            ArticleCommande articleCommande = new ArticleCommande();
            articleCommande.setProduit(null);
            articleCommande.setQuantite(1);
            articleCommande.setCommande(null);
            articleCommandeRepository.save(articleCommande);
            System.out.println("articleCommandes seedées !");
        } else {
            System.out.println("articleCommandes déjà présentes, skip");
        }
    }
}
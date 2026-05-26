package com.maven.seeder;

import org.springframework.stereotype.Component;

import com.maven.model.Produit;
import com.maven.repository.ProduitRepository;

@Component
public class ProduitSeeder {
    private final ProduitRepository produitRepository;

    public ProduitSeeder(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public void seedProduits() {
        if (produitRepository.count() == 0) {
            Produit produit = new Produit();
            produit.setNom(null);
            produit.setPrix(0);
            produit.setQuantiteStock(0);
            produit.setDerniereAjout(null);
            produit.setPerissable(false);
            produit.setDatePeremption(null);
            produit.setFournisseur(null);
            produit.setImage(null);
            produitRepository.save(produit);
            System.out.println("produits seedées !");
        } else {
            System.out.println("produits déjà présentes, skip");
        }
    }
    
}

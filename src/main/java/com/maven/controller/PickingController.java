package com.maven.controller;

import com.maven.model.ArticleCommande;
import com.maven.model.Produit;
import com.maven.repository.ArticleCommandeRepository;
import com.maven.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PickingController {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private ArticleCommandeRepository articleCommandeRepository;

    @PutMapping("/picking/produits/{id}")
    public Produit decrementStock(@PathVariable int id, @RequestBody int quantite) {
        Produit produit = produitRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produit introuvable"));
        produit.setQuantiteStock(produit.getQuantiteStock() - quantite);
        return produitRepository.save(produit);
    }

    @DeleteMapping("/picking/articleCommande/{id}")
    public void deleteArticleCommande(@PathVariable int id) {
        articleCommandeRepository.deleteById(id);
    }
}
package com.maven.controller;

import com.maven.model.Produit;
import com.maven.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;

public class ProduitController {
    @Autowired

    private ProduitRepository produitRepository;

    @GetMapping("/Produits")


    public List<Produit> getAllProduits() {
        
        return produitRepository.findAll(); // Placeholder return
    }

    @GetMapping("/Produits/{id}")

    public Produit getProduitById(int id) {

        // Implementation to retrieve a specific Produit by ID

        return produitRepository.findById(id).orElse(null);

    }

    @PutMapping("/Produits/{id}/create")

    public void createProduit(Produit produit) {

        // Implementation to create a new produit

        produitRepository.save(produit);  

    } 

    @PutMapping("/Produits/{id}/update")


    public void updateProduit(Produit produit) {
        // Implementation to update an existing Produit
        produitRepository.save(produit);

    }

    @PutMapping("/Produits/{id}/delete")

    public void deleteProduit(int id) {
        // Implementation to delete an ArticleCommande by ID

        produitRepository.deleteById(id);

    }

}
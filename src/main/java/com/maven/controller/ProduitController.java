package com.maven.controller;

import com.maven.model.Produit;
import com.maven.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
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

=======
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @GetMapping("/Produits")
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @GetMapping("/Produits/search")
    public List<Produit> searchProduits(@RequestParam String nom) {
        return produitRepository.findByNomContainingIgnoreCase(nom);
    }

    @GetMapping("/Produits/{id}")
    public Produit getProduitById(@PathVariable int id) {
        return produitRepository.findById(id).orElse(null);
    }

    @PostMapping("/Produits")
    public Produit createProduit(@RequestBody Produit produit) {
        return produitRepository.save(produit);
    }

    @PutMapping("/Produits/{id}")
    public Produit updateProduit(@PathVariable int id, @RequestBody Produit produit) {
        return produitRepository.save(produit);
    }

    @DeleteMapping("/Produits/{id}")
    public void deleteProduit(@PathVariable int id) {
        produitRepository.deleteById(id);
    }
>>>>>>> PageClient
}
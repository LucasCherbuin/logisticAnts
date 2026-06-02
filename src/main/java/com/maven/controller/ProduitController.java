package com.maven.controller;

import com.maven.model.Produit;
import com.maven.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}
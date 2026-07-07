package com.maven.controller;

import com.maven.model.Fournisseur;
import com.maven.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FournisseurController {

    @Autowired
    private FournisseurRepository fournisseurRepository;

    @GetMapping("/Fournisseurs")
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurRepository.findAll();
    }

    @GetMapping("/Fournisseurs/{id}")
    public Fournisseur getFournisseurById(@PathVariable int id) {
        return fournisseurRepository.findById(id).orElse(null);
    }

    @PostMapping("/Fournisseurs")
    public Fournisseur createFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    @PutMapping("/Fournisseurs/{id}")
    public Fournisseur updateFournisseur(@PathVariable int id, @RequestBody Fournisseur fournisseur) {
        fournisseur.setId(id);
        return fournisseurRepository.save(fournisseur);
    }

    @DeleteMapping("/Fournisseurs/{id}")
    public void deleteFournisseur(@PathVariable int id) {
        fournisseurRepository.deleteById(id);
    }
}
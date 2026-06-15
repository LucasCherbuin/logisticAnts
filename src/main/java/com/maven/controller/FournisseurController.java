package com.maven.controller;

import com.maven.model.Fournisseur;
import com.maven.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FournisseurController {
    @Autowired

    private FournisseurRepository fournisseurRepository;

    @GetMapping("/Fournisseurs")


    public List<Fournisseur> getAllFournisseurs() {

        return fournisseurRepository.findAll(); // Placeholder return
    }

    @GetMapping("/Fournisseurs/{id}")

    public Fournisseur getFournisseurById(int id) {

        // Implementation to retrieve a specific Fournisseur by ID

        return fournisseurRepository.findById(id).orElse(null);
    }

    @PutMapping("/Fournisseurs/{id}/create")

    public void createFournisseur(Fournisseur fournisseur) {

        // Implementation to create a new fournisseur
        fournisseurRepository.save(fournisseur);  

    } 

    @PutMapping("/Fournisseurs/{id}/update")


    public void updateFournisseur(Fournisseur fournisseur) {
        // Implementation to update an existing Fournisseur
        fournisseurRepository.save(fournisseur);

    }

    @PutMapping("/Fournisseurs/{id}/delete")
    public void deleteFournisseur(int id) {
        // Implementation to delete a Fournisseur by ID

        fournisseurRepository.deleteById(id);

    }

}
package com.maven.controller;
<<<<<<< HEAD

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maven.model.Commande;
import com.maven.repository.CommandeRepository;

import java.util.List;

@RestController
public class CommandeController {

    @Autowired
    private CommandeRepository commandeRepository;

    @GetMapping("/commandes")
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    @GetMapping("/commandes/{id}")
    public Commande getCommandeById(@PathVariable int id) {
        return commandeRepository.findById(id).orElse(null);
    }

    @PutMapping("/commandes/create")
    public void createCommande(@RequestBody Commande commande) {
        commandeRepository.save(commande);
    }

    @PutMapping("/commandes/{id}/update")
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.maven.model.Commande;
import com.maven.repository.CommandeRepository;
import java.util.List;
import java.sql.Blob;

@RestController
public class CommandeController {
    @Autowired
    private CommandeRepository commandeRepository;
    @GetMapping("/Commandes")
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }
    @GetMapping("/Commandes/{id}")
    public Commande getCommandeById(@PathVariable int id) {
        return commandeRepository.findById(id).orElse(null);
    }
    @PostMapping("/Commandes")
    public Commande createCommande(@RequestBody Commande commande) {
        return commandeRepository.save(commande);
    }
    @PutMapping("/Commandes/{id}/update")
>>>>>>> PageClient
    public void updateCommande(
            @PathVariable int id,
            @RequestBody Commande commande) {
        commandeRepository.save(commande);
    }

<<<<<<< HEAD
    @PutMapping("/commandes/{id}/delete")
    public void deleteCommande(@PathVariable int id) {
        commandeRepository.deleteById(id);
    }
}
=======
    @PutMapping("/Commandes/{id}/facture")
        public void updateFacture(@PathVariable int id, @RequestBody byte[] pdfBytes) {
            Commande commande = commandeRepository.findById(id).orElse(null);
                if (commande == null) return;
                commande.setFacture(pdfBytes);
                commandeRepository.save(commande);
     
        }

    @DeleteMapping("/Commandes/{id}")
    public void deleteCommande(@PathVariable int id) {
        commandeRepository.deleteById(id);
    }
}
>>>>>>> PageClient

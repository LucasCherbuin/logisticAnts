package com.maven.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.maven.model.Commande;
import com.maven.repository.CommandeRepository;
import java.util.List;
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
    public void updateCommande(
            @PathVariable int id,
            @RequestBody Commande commande) {
        commandeRepository.save(commande);
    }
    @DeleteMapping("/Commandes/{id}")
    public void deleteCommande(@PathVariable int id) {
        commandeRepository.deleteById(id);
    }
}
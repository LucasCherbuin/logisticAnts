package controller;

import model.Commande;
import repository.CommandeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public void updateCommande(
            @PathVariable int id,
            @RequestBody Commande commande) {
        commandeRepository.save(commande);
    }

    @PutMapping("/commandes/{id}/delete")
    public void deleteCommande(@PathVariable int id) {
        commandeRepository.deleteById(id);
    }
}

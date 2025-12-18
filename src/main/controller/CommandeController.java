package maven.controller;
import maven.model.Commande;

import maven.repository.ArticleCommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

public class CommandeController {
    
    @Autowired
    private CommandeRepository commandeRepository;
    
    @GetMapping("/Commandes")
    public List<Commande> getAllCommandes() {
        
        return commandeRepository.findAll(); // Placeholder return
    }
    
    @GetMapping("/Commandes/{id}")
    public Commande getCommandeById(int id) {
        // Implementation to retrieve a specific Commande by ID
        return commandeRepository.findById(id).orElse(null);
    }
    
    @putMapping("/Commandes/{id}/create")
    public void createCommande(Commande commande) {
        // Implementation to create a new commande
        commandeRepository.save(commande);
        
    } 
    
    @putMapping("/Commandes/{id}/update")
    public void updateCommande(Commande commande) {
        // Implementation to update an existing Commande
        commandeRepository.save(commande);
    }
    @putMapping("/Commandes/{id}/delete")
    public void deleteCommande(int id) {
        // Implementation to delete an ArticleCommande by ID
        commandeRepository.deleteById(id);
    }
}

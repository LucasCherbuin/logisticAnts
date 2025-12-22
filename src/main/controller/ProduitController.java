package maven.controller;

import maven.model.Produit;
import maven.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class ProduitController {
    @Autowired

    private ProduitRepository produitRepository;

    @GetMapping("/Produits")


    public List<Produit> getAllProduits() {
        
        return commandeRepository.findAll(); // Placeholder return
    }

    @GetMapping("/Produits/{id}")

    public Produit getProduitById(int id) {

        // Implementation to retrieve a specific Commande by ID

        return commandeRepository.findById(id).orElse(null);

    }

    @putMapping("/Produits/{id}/create")

    public void createProduit(Produit produit) {

        // Implementation to create a new commande

        commandeRepository.save(commande);  

    } 

    @putMapping("/Produits/{id}/update")


    public void updateProduit(Produit produit) {
        // Implementation to update an existing Commande
        commandeRepository.save(commande);

    }

    @putMapping("/Produits/{id}/delete")

    public void deleteProduit(int id) {
        // Implementation to delete an ArticleCommande by ID

        commandeRepository.deleteById(id);

    }

}
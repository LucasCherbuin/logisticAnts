package maven.controller;

import maven.model.ArticleCommande;
import maven.repository.ArticleCommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ArticleCommandeController {
    
    @Autowired
    private ArticleCommandeRepository articleCommandeRepository;
    
    @GetMapping("/articleCommandes")
    public List<ArticleCommande> getAllArticleCommandes() {
        
        return articleCommandeRepository.findAll(); // Placeholder return
    }
    
    @GetMapping("/articleCommandes/{id}")
    public ArticleCommande getArticleCommandeById(int id) {
        // Implementation to retrieve a specific ArticleCommande by ID
        return articleCommandeRepository.findById(id).orElse(null);
    }
    
    @putMapping("/articleCommandes/{id}/create")
    public void createArticleCommande(ArticleCommande articleCommande) {
        // Implementation to create a new ArticleCommande
        articleCommandeRepository.save(articleCommande);
        
    } 
    
    @putMapping("/articleCommandes/{id}/update")
    public void updateArticleCommande(ArticleCommande articleCommande) {
        // Implementation to update an existing ArticleCommande
        articleCommandeRepository.save(articleCommande);
    }
    @putMapping("/articleCommandes/{id}/delete")
    public void deleteArticleCommande(int id) {
        // Implementation to delete an ArticleCommande by ID
        articleCommandeRepository.deleteById(id);
    }
}
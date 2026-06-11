package com.maven.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.maven.model.ArticleCommande;
import com.maven.model.Commande;
import com.maven.repository.ArticleCommandeRepository;
import java.util.List;

@RestController
public class ArticleCommandeController {
    @Autowired
    private ArticleCommandeRepository articleCommandeRepository;

    @GetMapping("/ArticleCommandes")
    public List<ArticleCommande> getAllArticleCommandes() {
        return articleCommandeRepository.findAll();
    }

    @GetMapping("/ArticleCommandes/{id}")
    public ArticleCommande getArticleCommandeById(@PathVariable int id) {
        return articleCommandeRepository.findById(id).orElse(null);
    }

    @PostMapping("/ArticleCommandes")
    public ArticleCommande createArticleCommande(@RequestBody ArticleCommande articleCommande) {
        return articleCommandeRepository.save(articleCommande);
    }

    @PutMapping("/ArticleCommandes/{id}/update")
    public void updateArticleCommande(@PathVariable int id, @RequestBody ArticleCommande articleCommande) {
        articleCommandeRepository.save(articleCommande);
    }

    @PutMapping("/ArticleCommandes/{id}/delete")
    public void deleteArticleCommande(@PathVariable int id) {
        articleCommandeRepository.deleteById(id);
    }

    @PostMapping("/ArticleCommandes/{id}/commande/{commandeId}")
    public void assignCommande(@PathVariable int id, @PathVariable int commandeId) {
        ArticleCommande ac = articleCommandeRepository.findById(id).orElse(null);
        if (ac == null) return;
        Commande commande = new Commande();
        commande.setId(commandeId);
        ac.setCommande(commande);
        articleCommandeRepository.save(ac);
    }
}
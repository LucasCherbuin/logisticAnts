package com.maven.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.maven.model.ArticleCommande;
import com.maven.model.Commande;
import com.maven.repository.ArticleCommandeRepository;
import com.maven.repository.CommandeRepository;

@RestController
public class ArticleCommandeController {

    @Autowired
    private CommandeRepository commandeRepository;

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
    public ArticleCommande updateArticleCommande(
            @PathVariable int id,
            @RequestBody ArticleCommande articleCommande) {

        articleCommande.setId(id);
        return articleCommandeRepository.save(articleCommande);
    }

    @DeleteMapping("/ArticleCommandes/{id}")
    public void deleteArticleCommande(@PathVariable int id) {
        articleCommandeRepository.deleteById(id);
    }

    @PostMapping("/ArticleCommandes/{id}/commande/{commandeId}")
    public void assignCommande(@PathVariable int id, @PathVariable int commandeId) {

        ArticleCommande articleCommande = articleCommandeRepository.findById(id).orElse(null);

        if (articleCommande == null) {
            return;
        }

        Commande commande = commandeRepository.findById(commandeId).orElse(null);

        if (commande == null) {
            return;
        }

        articleCommande.setCommande(commande);
        articleCommandeRepository.save(articleCommande);
    }
}
package com.maven.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maven.model.ArticleCommande;
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

    @PutMapping("/ArticleCommandes/create")
    public void createArticleCommande(@RequestBody ArticleCommande articleCommande) {
        articleCommandeRepository.save(articleCommande);
    }

    @PutMapping("/ArticleCommandes/{id}/update")
    public void updateArticleCommande(
            @PathVariable int id,
            @RequestBody ArticleCommande articleCommande) {
        articleCommandeRepository.save(articleCommande);
    }

    @PutMapping("/ArticleCommandes/{id}/delete")
    public void deleteArticleCommande(@PathVariable int id) {
        articleCommandeRepository.deleteById(id);
    }
}

package controller;

import model.ArticleCommande;
import repository.ArticleCommandeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
public class ArticleCommandeController {

    @Autowired
    private ArticleCommandeRepository articleCommandeRepository;

    @GetMapping("/articleCommandes")
    public List<ArticleCommande> getAllArticleCommandes() {
        return articleCommandeRepository.findAll();
    }

    @GetMapping("/articleCommandes/{id}")
    public ArticleCommande getArticleCommandeById(@PathVariable int id) {
        return articleCommandeRepository.findById(id).orElse(null);
    }

    @PutMapping("/articleCommandes/create")
    public void createArticleCommande(@RequestBody ArticleCommande articleCommande) {
        articleCommandeRepository.save(articleCommande);
    }

    @PutMapping("/articleCommandes/{id}/update")
    public void updateArticleCommande(
            @PathVariable int id,
            @RequestBody ArticleCommande articleCommande) {
        articleCommandeRepository.save(articleCommande);
    }

    @PutMapping("/articleCommandes/{id}/delete")
    public void deleteArticleCommande(@PathVariable int id) {
        articleCommandeRepository.deleteById(id);
    }
}

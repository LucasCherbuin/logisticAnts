package com.maven.controller;
<<<<<<< HEAD

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maven.model.ArticleCommande;
import com.maven.repository.ArticleCommandeRepository;

=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.maven.model.ArticleCommande;
import com.maven.model.Commande;
import com.maven.repository.ArticleCommandeRepository;
<<<<<<< HEAD
>>>>>>> PageClient
=======
import com.maven.repository.CommandeRepository;

>>>>>>> PageAdmin
import java.util.List;

@RestController
public class ArticleCommandeController {
<<<<<<< HEAD

    @Autowired
    private ArticleCommandeRepository articleCommandeRepository;

    @GetMapping("/articleCommandes")
=======
    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private ArticleCommandeRepository articleCommandeRepository;

    @GetMapping("/ArticleCommandes")
>>>>>>> PageClient
    public List<ArticleCommande> getAllArticleCommandes() {
        return articleCommandeRepository.findAll();
    }

<<<<<<< HEAD
    @GetMapping("/articleCommandes/{id}")
=======
    @GetMapping("/ArticleCommandes/{id}")
>>>>>>> PageClient
    public ArticleCommande getArticleCommandeById(@PathVariable int id) {
        return articleCommandeRepository.findById(id).orElse(null);
    }

<<<<<<< HEAD
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
=======
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
<<<<<<< HEAD
}
>>>>>>> PageClient
=======
}
>>>>>>> PageAdmin

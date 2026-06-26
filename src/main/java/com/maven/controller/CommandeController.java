package com.maven.controller;
<<<<<<< HEAD
<<<<<<< HEAD

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maven.model.Commande;
import com.maven.repository.CommandeRepository;

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
=======
=======

>>>>>>> PageAdmin
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.maven.model.Commande;
import com.maven.repository.CommandeRepository;
import com.maven.repository.ArticleCommandeRepository;
import com.maven.modelNosql.Prix;
import com.maven.modelNosql.ProduitPhare;
import com.maven.repositoryNosql.PrixRepository;
import com.maven.repositoryNosql.ProduitPhareRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;

@RestController
public class CommandeController {

    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private ArticleCommandeRepository articleCommandeRepository;
    @Autowired
    private ProduitPhareRepository produitPhareRepository;
    @Autowired
    private PrixRepository prixRepository;

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
<<<<<<< HEAD
>>>>>>> PageClient
    public void updateCommande(
            @PathVariable int id,
            @RequestBody Commande commande) {
=======
    public void updateCommande(@PathVariable int id, @RequestBody Commande commande) {
>>>>>>> PageAdmin
        commandeRepository.save(commande);
    }

<<<<<<< HEAD
    @PutMapping("/commandes/{id}/delete")
    public void deleteCommande(@PathVariable int id) {
        commandeRepository.deleteById(id);
    }
}
=======
    @PutMapping("/Commandes/{id}/facture")
    public void updateFacture(@PathVariable int id, @RequestBody byte[] pdfBytes) {
        Commande commande = commandeRepository.findById(id).orElse(null);
        if (commande == null) return;
        commande.setFacture(pdfBytes);
        commandeRepository.save(commande);

        List<com.maven.model.ArticleCommande> articles = commande.getArticleCommandes();
        System.out.print("articles:" + (articles == null ? "NULL" : articles.size()));
        if (articles != null) {
            int totalAchat = articles.stream()
                .mapToInt(a -> (int)(a.getProduit().getPrix() * a.getQuantite()))
                .sum();

            Prix prix = new Prix();
            prix.setAchat(totalAchat);
            prix.setRemboursement(0);
            prix.setPrixTotal(totalAchat);
            prix.setDate(new Date());
            prixRepository.save(prix);

            for (com.maven.model.ArticleCommande article : articles) {
                int produitId = article.getProduit().getId();
                int quantite = article.getQuantite();

                List<ProduitPhare> existants = produitPhareRepository.findByProduit(produitId);
                if (!existants.isEmpty()) {
                    ProduitPhare pp = existants.get(0);
                    pp.setAchat(pp.getAchat() + quantite);
                    produitPhareRepository.save(pp);
                } else {
                    ProduitPhare pp = new ProduitPhare();
                    pp.setProduit(produitId);
                    pp.setAchat(quantite);
                    produitPhareRepository.save(pp);
                }
            }
        }
    }
<<<<<<< HEAD
}
>>>>>>> PageClient
=======

    @Transactional
    @DeleteMapping("/Commandes/{id}")
        public ResponseEntity<?> deleteCommande(@PathVariable Integer id) {
            Commande commande = commandeRepository.findById(id).orElse(null);
            if (commande != null) {
                List<com.maven.model.ArticleCommande> articles = commande.getArticleCommandes();
                if (articles != null) {
                    int totalRemboursement = articles.stream()
                        .mapToInt(a -> (int)(a.getProduit().getPrix() * a.getQuantite()))
                        .sum();
                    Prix prix = new Prix();
                    prix.setAchat(0);
                    prix.setRemboursement(totalRemboursement);
                    prix.setPrixTotal(-totalRemboursement);
                    prix.setDate(new Date());
                    prixRepository.save(prix);
                }
            }
            articleCommandeRepository.deleteByCommandeId(id);
            commandeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
}
>>>>>>> PageAdmin

package com.maven.controller;

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
import java.util.Collections;
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

    @PutMapping("/Commandes/{id}")
    public void updateCommande(@PathVariable int id, @RequestBody Commande commande) {
        commande.setId(id);
        commandeRepository.save(commande);
    }

    @GetMapping("/Commandes/search")
    public List<Commande> searchCommandes(@RequestParam String term) {
        try {
            int id = Integer.parseInt(term);
            return commandeRepository.findById(id)
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());
        } catch (NumberFormatException e) {
            return commandeRepository.findByUserPseudoContainingIgnoreCase(term);
        }
    }

    @PutMapping("/Commandes/{id}(confirmed")
    public Commande confirmedPay(@PathVariable int id) {
        return commandeRepository.findById(id).orElse(null);
    }

    @PutMapping("/Commandes/{id}/facture")
    public void updateFacture(@PathVariable int id, @RequestBody byte[] pdfBytes) {
        Commande commande = commandeRepository.findById(id).orElse(null);
        if (commande == null) return;
        commande.setFacture(pdfBytes);
        commandeRepository.save(commande);

        List<com.maven.model.ArticleCommande> articles = commande.getArticleCommandes();
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
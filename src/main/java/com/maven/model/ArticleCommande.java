package com.maven.model;

import jakarta.persistence.ManyToMany;
import jakarta.persistence.*;


@Entity
@Table(name = "article_commande")
public class ArticleCommande {
    private int id;
    @ManyToMany
    private int produitId; 
    private int quantite;

    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;

    public ArticleCommande() {}

    public int getId() { return id; }
    public Produit getProduit() { return produit; }
    public int getQuantite() { return quantite; }
    public Commande getCommande() { return commande; }

    public void setId(int id) { this.id = id; }
    public void setProduit(Produit produit) { this.produit = produit; }
    public void setQuantite(int quantite) { this.quantite = quantite; }
    public void setCommande(Commande commande) { this.commande = commande; }
}
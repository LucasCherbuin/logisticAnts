<<<<<<< HEAD
package com.maven.model;

import jakarta.persistence.*;

@Entity
@Table(name = "article_commande")
public class ArticleCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

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
=======
package com.maven.model;

import jakarta.persistence.*;

@Entity
@Table(name = "article_commande")
public class ArticleCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

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
>>>>>>> login
}
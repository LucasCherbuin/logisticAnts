<<<<<<< HEAD
package com.maven.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Blob;
import java.util.List;

@Entity
@Table(name = "commande")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String payement;
    @JsonIgnore
    private Blob facture;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
    private List<ArticleCommande> articleCommandes;

    public Commande() {}

    public Commande(String payement, Blob facture) {
        this.payement = payement;
        this.facture = facture;
    }

    public int getId() { return id; }
    public String getPayment() { return payement; }
    public Blob getfacture() { return facture; }
    public User getUser() { return user; }
    public List<ArticleCommande> getArticleCommandes() { return articleCommandes; }

    public void setId(int id) { this.id = id; }
    public void setPayement(String payement) { this.payement = payement; }
    public void setFacture(Blob facture) { this.facture = facture; }
    public void setUser(User user) { this.user = user; }
    public void setArticleCommandes(List<ArticleCommande> articleCommandes) { this.articleCommandes = articleCommandes; }
=======
package com.maven.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "commande")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
    private List<ArticleCommande> articleCommandes;

    public Commande() {}

    public int getId() { return id; }
    public User getUser() { return user; }
    public List<ArticleCommande> getArticleCommandes() { return articleCommandes; }

    public void setId(int id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setArticleCommandes(List<ArticleCommande> articleCommandes) { this.articleCommandes = articleCommandes; }
>>>>>>> login
}
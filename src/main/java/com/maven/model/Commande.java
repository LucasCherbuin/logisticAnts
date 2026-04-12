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
    private List<ArticleCommande> articles;

    // Constructeur vide (obligatoire)
    public Commande() {}

    public Commande(String payement, Blob facture) {
        this.payement = payement;
        this.facture = facture;
    }

    // Getters
    public int getId() { return id; }
    public String getPayement() { return payement; }
    public Blob getFacture() { return facture; }
    public User getUser() { return user; }
    public List<ArticleCommande> getArticles() { return articles; }

    // Setters
    public void setId(int id) { this.id = id; }
    public void setPayement(String payement) { this.payement = payement; }
    public void setFacture(Blob facture) { this.facture = facture; }
    public void setUser(User user) { this.user = user; }
    public void setArticles(List<ArticleCommande> articles) { this.articles = articles; }
}
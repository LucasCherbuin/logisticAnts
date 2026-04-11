package com.maven.model;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.*;
<<<<<<< HEAD

=======
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Blob;
import java.util.List;
>>>>>>> 740c22f (mise à jour classe 'commande')

@Entity
@Table(name = "commande")

public class Commande {
    private int id;
<<<<<<< HEAD
=======

    private String payement;
    @JsonIgnore
    private Blob facture;


>>>>>>> 740c22f (mise à jour classe 'commande')
    @ManyToOne
    private int articleCommandeId;
    @OneToMany
    private int userId;
    
    public Commande(int id, int articleCommandeId, int userId) {
        this.id = id;
        this.articleCommandeId = articleCommandeId;
        this.userId = userId;
    }

<<<<<<< HEAD
    //getters
    public int getId() {
        return id;
    }
    public int getArticleCommandeId() {
        return articleCommandeId;
    }
    public int getUserId() {
        return userId;
    }
=======
    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
    private List<ArticleCommande> articles;


    // constructeurs, getters et setters
    public Commande() {}

    public Commande(String payement, Blob facture) {
        this.payement = payement;
        this.facture = facture;
    }

    public int getId() { return id; }
    public String getPayment() { return payement; }
    public Blob getfacture() { return facture; }
    public User getUser() { return user; }
    public List<ArticleCommande> getArticles() { return articles; }

    public void setId(int id) { this.id = id; }
    public void setPayement(String payement) { this.payement = payement; }
    public void setFacture(Blob facture) { this.facture = facture; }
    public void setUser(User user) { this.user = user; }
    public void setArticles(List<ArticleCommande> articles) { this.articles = articles; }
>>>>>>> 740c22f (mise à jour classe 'commande')
}

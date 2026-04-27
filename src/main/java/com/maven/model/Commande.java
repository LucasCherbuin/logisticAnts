package com.maven.model;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.*;


@Entity
@Table(name = "commande")

public class Commande {
    private int id;
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
}
=======
    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
    private List<ArticleCommande> articleCommandes;

    public Commande() {}

    public int getId() { return id; }
    public User getUser() { return user; }
    public List<ArticleCommande> getArticleCommandes() { return articleCommandes; }

    public void setId(int id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setArticleCommandes(List<ArticleCommande> articleCommandes) { this.articleCommandes = articleCommandes; }
}
>>>>>>> 5a82615 (correction back end)

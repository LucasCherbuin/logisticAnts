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

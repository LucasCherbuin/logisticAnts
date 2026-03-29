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
    private List<ArticleCommande> articles;

    // constructeurs, getters et setters
    public Commande() {}

    public int getId() { return id; }
    public User getUser() { return user; }
    public List<ArticleCommande> getArticles() { return articles; }

    public void setId(int id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setArticles(List<ArticleCommande> articles) { this.articles = articles; }
}

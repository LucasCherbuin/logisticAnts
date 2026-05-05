<<<<<<< HEAD
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
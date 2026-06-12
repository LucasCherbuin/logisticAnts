package com.maven.model;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "commande")
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String payement;
    @Lob
    @Column(name = "facture", columnDefinition = "LONGBLOB")
    private byte[] facture;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "commande", cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private List<ArticleCommande> articleCommandes;

    public Commande() {}
    public Commande(String payement, byte[] facture) {
        this.payement = payement;
        this.facture = facture;
    }
    public int getId() { return id; }
    public String getPayement() { return payement; }
    public byte[] getFacture() { return facture; }
    public User getUser() { return user; }
    public List<ArticleCommande> getArticleCommandes() { return articleCommandes; }
    public void setId(int id) { this.id = id; }
    public void setPayement(String payement) { this.payement = payement; }
    public void setFacture(byte[] facture) { this.facture = facture; }
    public void setUser(User user) { this.user = user; }
    public void setArticleCommandes(List<ArticleCommande> articleCommandes) { this.articleCommandes = articleCommandes; }
}
package com.maven.model;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String url;

    @OneToOne(mappedBy = "image")
    private Produit produit;

    public Image() {}

    public Image(String url) {
        this.url = url;
    }

    public int getId() { return id; }
    public String getUrl() { return url; }
    public Produit getProduit() { return produit; }

    public void setId(int id) { this.id = id; }
    public void setUrl(String url) { this.url = url; }
    public void setProduit(Produit produit) { this.produit = produit; }
}
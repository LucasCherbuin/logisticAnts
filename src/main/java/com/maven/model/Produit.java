package com.maven.model;

import jakarta.persistence.*;
import java.sql.Date;


@Entity
@Table(name = "produit")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private int prix;
    private int quantiteStock;
    private Date derniereAjout;
    private boolean perissable;
    private Date datePeremption;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;

    @OneToOne
    @JoinColumn(name = "image_id")
    private Image image;

    public Produit() {}

    public Produit(String nom, int prix, int quantiteStock, Date derniereAjout, boolean perissable, Date datePeremption, Fournisseur fournisseur, Image image) {
        this.nom = nom;
        this.prix = prix;
        this.quantiteStock = quantiteStock;
        this.derniereAjout = derniereAjout;
        this.perissable = perissable;
        this.datePeremption = datePeremption;
        this.fournisseur = fournisseur;
        this.image = image;
    }

    public int getId() { return id; }
    public String getNom() { return nom; }
    public int getPrix() { return prix; }
    public int getQuantiteStock() { return quantiteStock; }
    public Date getDerniereAjout() { return derniereAjout; }
    public boolean isPerissable() { return perissable; }
    public Date getDatePeremption() { return datePeremption; }
    public Fournisseur getFournisseur() { return fournisseur; }
    public Image getImage() { return image; }

    public void setId(int id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setPrix(int prix) { this.prix = prix; }
    public void setQuantiteStock(int quantiteStock) { this.quantiteStock = quantiteStock; }
    public void setDerniereAjout(Date derniereAjout) { this.derniereAjout = derniereAjout; }
    public void setPerissable(boolean perissable) { this.perissable = perissable; }
    public void setDatePeremption(Date datePeremption) { this.datePeremption = datePeremption; }
    public void setFournisseur(Fournisseur fournisseur) { this.fournisseur = fournisseur; }
    public void setImage(Image image) { this.image = image; }
}
package com.maven.model;

import jakarta.persistence.*;
import java.util.List;

<<<<<<< HEAD
=======


>>>>>>> PageClient
@Entity
@Table(name = "fournisseur")
public class Fournisseur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String adresse;
    private String email;

    @OneToMany(mappedBy = "fournisseur")
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> PageClient
=======
>>>>>>> PageAdmin
    private List<Produit> produits;

    public Fournisseur() {}

    public Fournisseur(String nom, String adresse, String email) {
        this.nom = nom;
        this.adresse = adresse;
        this.email = email;
    }

    public int getId() { return id; }
    public String getNom() { return nom; }
    public String getAdresse() { return adresse; }
    public String getEmail() { return email; }
    public List<Produit> getProduits() { return produits; }

    public void setId(int id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
    public void setEmail(String email) { this.email = email; }
    public void setProduits(List<Produit> produits) { this.produits = produits; }
}
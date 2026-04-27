package com.maven.modelNosql;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
<<<<<<< HEAD
@Table(name = "ProduitPhare")


public class Prix {

    int id;
    int prixTotal;
    int remboursement;
    int Achat;
    Date date;
    public Prix(int id, int prixTotal, int remboursement, int achat, Date date) {
=======
@Table(name = "Prix")
public class Prix {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int produit;
    private int achat;

    public Prix() {}

    public Prix(int id, int produit, int achat) {
>>>>>>> 5a82615 (correction back end)
        this.id = id;
        this.prixTotal = prixTotal;
        this.remboursement = remboursement;
        this.Achat = Achat;
        this.date = date;
    }

<<<<<<< HEAD
    //getters

    public int getId() {
        return id;
    }

    public int getPrixTotal() {
        return prixTotal;
    }

    public int getRemboursement() {
        return remboursement;
    }

    public int getAachat() {
        return Achat;
    }

    public Date getDate() {
        return date;
    }

    //setters

    public void setId(int id) {
        this.id = id;
    }

    public void setPrixTotal(int prixTotal) {
        this.prixTotal = prixTotal;
    }

    public void setRemboursement(int remboursement) {
        this.remboursement = remboursement;
    }

    public void setAchat(int achat) {
        this.Achat = achat;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
}
=======
    public int getId() { return id; }
    public int getProduit() { return produit; }
    public int getAchat() { return achat; }

    public void setId(int id) { this.id = id; }
    public void setProduit(int produit) { this.produit = produit; }
    public void setAchat(int achat) { this.achat = achat; }
}
>>>>>>> 5a82615 (correction back end)

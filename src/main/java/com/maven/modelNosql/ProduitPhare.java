package com.maven.modelNosql;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
<<<<<<< HEAD
@Table(name = "Prix")

public class ProduitPhare {

    int id;
    int produit;
    int achat;

    public ProduitPhare(int id, int produit, int achat) {
=======
@Table(name = "ProduitPhare")
public class ProduitPhare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int prixTotal;
    private int remboursement;
    private int achat;
    private Date date;

    public ProduitPhare() {}

    public ProduitPhare(int id, int prixTotal, int remboursement, int achat, Date date) {
>>>>>>> 5a82615 (correction back end)
        this.id = id;
        this.produit = produit;
        this.achat = achat;
    }

<<<<<<< HEAD
    //getters   

    public int getId() {
        return id;
    }

    public int getProduit() {
        return produit;
    }

    public int getAchat() {
        return achat;
    }

    //setters

    public void setId(int id) {
        this.id = id;
    }

    public void setProduit(int produit) {
        this.produit = produit;
    }

    public void setAchat(int achat) {
        this.achat = achat;
    }

}
=======
    public int getId() { return id; }
    public int getPrixTotal() { return prixTotal; }
    public int getRemboursement() { return remboursement; }
    public int getAchat() { return achat; }
    public Date getDate() { return date; }

    public void setId(int id) { this.id = id; }
    public void setPrixTotal(int prixTotal) { this.prixTotal = prixTotal; }
    public void setRemboursement(int remboursement) { this.remboursement = remboursement; }
    public void setAchat(int achat) { this.achat = achat; }
    public void setDate(Date date) { this.date = date; }
}
>>>>>>> 5a82615 (correction back end)

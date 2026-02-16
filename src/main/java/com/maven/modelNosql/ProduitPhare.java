package com.maven.modelNosql;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "ProduitPhare")


public class ProduitPhare {

    int id;
    int prixTotal;
    int remboursement;
    int achat;
    Date date;
    public ProduitPhare(int id, int prixTotal, int remboursement, int achat, Date date) {
        this.id = id;
        this.prixTotal = prixTotal;
        this.remboursement = remboursement;
        this.achat = achat;
        this.date = date;
    }

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

    public int getAchat() {
        return achat;
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
        this.achat = achat;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
}

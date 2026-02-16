package com.maven.modelNosql;

import jakarta.persistence.*;

@Entity
@Table(name = "Prix")

public class Prix {

    int id;
    int produit;
    int achat;

    public Prix(int id, int produit, int achat) {
        this.id = id;
        this.produit = produit;
        this.achat = achat;
    }

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

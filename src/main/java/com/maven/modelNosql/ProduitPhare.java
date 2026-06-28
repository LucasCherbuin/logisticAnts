package com.maven.modelNosql;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ProduitPhare")
public class ProduitPhare {

    @Id
    private String id;
    private int produit;
    private int achat;

    public ProduitPhare() {}

    public ProduitPhare(String id, int produit, int achat) {
        this.id = id;
        this.produit = produit;
        this.achat = achat;
    }

    public String getId() { return id; }
    public int getProduit() { return produit; }
    public int getAchat() { return achat; }
    public void setId(String id) { this.id = id; }
    public void setProduit(int produit) { this.produit = produit; }
    public void setAchat(int achat) { this.achat = achat; }
}
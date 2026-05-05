<<<<<<< HEAD
package com.maven.modelNosql;

import jakarta.persistence.*;

@Entity
@Table(name = "Prix")
public class Prix {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int produit;
    private int achat;

    public Prix() {}

    public Prix(int id, int produit, int achat) {
        this.id = id;
        this.produit = produit;
        this.achat = achat;
    }

    public int getId() { return id; }
    public int getProduit() { return produit; }
    public int getAchat() { return achat; }

    public void setId(int id) { this.id = id; }
    public void setProduit(int produit) { this.produit = produit; }
    public void setAchat(int achat) { this.achat = achat; }
=======
package com.maven.modelNosql;

import jakarta.persistence.*;

@Entity
@Table(name = "Prix")
public class Prix {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int produit;
    private int achat;

    public Prix() {}

    public Prix(int id, int produit, int achat) {
        this.id = id;
        this.produit = produit;
        this.achat = achat;
    }

    public int getId() { return id; }
    public int getProduit() { return produit; }
    public int getAchat() { return achat; }

    public void setId(int id) { this.id = id; }
    public void setProduit(int produit) { this.produit = produit; }
    public void setAchat(int achat) { this.achat = achat; }
>>>>>>> login
}
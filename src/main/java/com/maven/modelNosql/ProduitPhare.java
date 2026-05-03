package com.maven.modelNosql;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
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
        this.id = id;
        this.prixTotal = prixTotal;
        this.remboursement = remboursement;
        this.achat = achat;
        this.date = date;
    }

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
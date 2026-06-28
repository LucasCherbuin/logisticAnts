package com.maven.modelNosql;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "Prix")
public class Prix {

    @Id
    private String id;
    private int prixTotal;
    private int remboursement;
    private int achat;
    private Date date;

    public Prix() {}

    public Prix(String id, int prixTotal, int remboursement, int achat, Date date) {
        this.id = id;
        this.prixTotal = prixTotal;
        this.remboursement = remboursement;
        this.achat = achat;
        this.date = date;
    }

    public String getId() { return id; }
    public int getPrixTotal() { return prixTotal; }
    public int getRemboursement() { return remboursement; }
    public int getAchat() { return achat; }
    public Date getDate() { return date; }
    public void setId(String id) { this.id = id; }
    public void setPrixTotal(int prixTotal) { this.prixTotal = prixTotal; }
    public void setRemboursement(int remboursement) { this.remboursement = remboursement; }
    public void setAchat(int achat) { this.achat = achat; }
    public void setDate(Date date) { this.date = date; }
}
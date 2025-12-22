package model;

import java.sql.Date;

public class Produit {
    private int id;
    private String nom;
    private int prix;
    private int quantiteStock;
    private Date derniereAjout;
    private boolean perissable;
    private Date datePeremption;
    private int fournisseurId;
    private int imageId;
    
    public Produit(int id, String nom, int prix, int quantiteStock, Date derniereAjout, boolean perissable, Date datePeremption, int fournisseurId, int imageId) {  // ✅ Parenthèse ajoutée
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.quantiteStock = quantiteStock;
        this.derniereAjout = derniereAjout;
        this.perissable = perissable;
        this.datePeremption = datePeremption;
        this.fournisseurId = fournisseurId;
        this.imageId = imageId;
    }
    
    // Getters
    public int getId() {
        return id;
    }
    
    public String getNom() {
        return nom;
    }
    
    public int getPrix() {
        return prix;
    }
    
    public int getQuantiteStock() {
        return quantiteStock;
    }
    
    public Date getDerniereAjout() {
        return derniereAjout;
    }
    
    public boolean isPerissable() {
        return perissable;
    }
    
    public Date getDatePeremption() {
        return datePeremption;
    }
    
    public int getFournisseurId() {  
        return fournisseurId;
    }
    
    public int getImageId() {  
        return imageId;
    }
    
    // Setters
    public void setId(int id) {
        this.id = id;
    }
    
    public void setNom(String nom) {
        this.nom = nom;
    }
    
    public void setPrix(int prix) {
        this.prix = prix;
    }
    
    public void setQuantiteStock(int quantiteStock) {
        this.quantiteStock = quantiteStock;
    }
    
    public void setDerniereAjout(Date derniereAjout) {
        this.derniereAjout = derniereAjout;
    }
    
    public void setPerissable(boolean perissable) {
        this.perissable = perissable;
    }
    
    public void setDatePeremption(Date datePeremption) {
        this.datePeremption = datePeremption;
    }
    
    public void setFournisseurId(int fournisseurId) {
        this.fournisseurId = fournisseurId;
    }
    
    public void setImageId(int imageId) {
        this.imageId = imageId;
    }
}
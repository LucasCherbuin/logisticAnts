package model;

public class ArticleCommande {
    private int id;
    private int produitId; 
    private int quantite;
    
    public ArticleCommande(int id, int produitId, int quantite) {
        this.id = id;
        this.produitId = produitId;
        this.quantite = quantite;
    }
    
    // Getters
    public int getId() {
        return id;
    }
    
    public int getProduitId() {
        return produitId;
    }
    
    public int getQuantite() {
        return quantite;
    }
    
    // Setters
    public void setId(int id) {
        this.id = id;
    }
    
    public void setProduitId(int produitId) {
        this.produitId = produitId;
    }
    
    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
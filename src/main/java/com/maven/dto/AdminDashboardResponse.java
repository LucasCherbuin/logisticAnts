package com.maven.dto;

import com.maven.modelNosql.*;
import java.util.List;

public class AdminDashboardResponse {

    private List<Prix> prixs;
    private int remboursement;
    private int Achat;
    private int totalProduits;

    private List<ProduitPhare> produitPhares;
    private int produit;
    private int achat;

    public AdminDashboardResponse(List<Prix> prixs, int remboursement, int Achat, int totalProduits, List<ProduitPhare> produitPhares, int produit, int achat) {
        
        this.remboursement = remboursement;
        this.Achat = Achat;
        this.totalProduits = totalProduits;
        this.produit = produit;
        this.achat = achat;
    }



    public int getRemboursement() {
        return remboursement;
    }

    public int getAachat() {
        return Achat;
    }

    public int getTotalProduits() {
        return totalProduits;
    }

    public int getProduit() {
        return produit;
    }

    public int getAchat() {
        return achat;
    }
    
    
}
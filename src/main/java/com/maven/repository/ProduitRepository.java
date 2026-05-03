package com.maven.repository;

import com.maven.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.sql.Date;
import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Integer> {
    List<Produit> findByNomContaining(String nom);
    List<Produit> findByPrixLessThanEqual(int prix);
    List<Produit> findByQuantiteStockGreaterThanEqual(int quantiteStock);
    List<Produit> findByDerniereAjoutAfter(Date date);
    List<Produit> findByDatePeremptionBefore(Date date);
    List<Produit> findByPerissable(boolean perissable);
    List<Produit> findByFournisseurId(int fournisseurId);
    List<Produit> findByImageId(int imageId);
}
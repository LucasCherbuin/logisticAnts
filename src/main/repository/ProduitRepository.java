package maven.repository;

import maven.model.Produit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Integer> {
   

    List<Produit> findByNomContaining(String nom);
    List<Produit> findByPrixLessThanEqual(int prix);
    List<Produit> findByQuantiteStockGreaterThanEqual(int quantiteStock);
    List<Produit> findByDerniereAjoutAfter(java.sql.Date date);
    List<Produit> findByDatePeremptionBefore(java.sql.Date date);
    List<Produit> findByPerissable(boolean perissable);
    List<Produit> findByFournisseurId(int fournisseurId);
    List<Produit> findByImageId(int imageId);
}
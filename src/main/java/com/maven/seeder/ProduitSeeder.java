package com.maven.seeder;
import org.springframework.stereotype.Component;
import com.maven.model.Produit;
import com.maven.repository.ProduitRepository;
import com.maven.model.Fournisseur;
import com.maven.repository.FournisseurRepository;
import java.util.List;
@Component
public class ProduitSeeder {
    private final ProduitRepository produitRepository;
    private final FournisseurRepository fournisseurRepository;
    public ProduitSeeder(ProduitRepository produitRepository, FournisseurRepository fournisseurRepository) {
        this.produitRepository = produitRepository;
        this.fournisseurRepository = fournisseurRepository;
    }
    public void seedProduits() {
        if (produitRepository.count() == 0) {
            List<Fournisseur> fournisseurs = fournisseurRepository.findByNomContaining("lamag");
            Fournisseur lamag = fournisseurs.isEmpty() ? null : fournisseurs.get(0);
            Produit produit = new Produit();
            produit.setNom("set de fourchette x20");
            produit.setPrix(20);
            produit.setQuantiteStock(10);
            produit.setDerniereAjout(null);
            produit.setPerissable(false);
            produit.setDatePeremption(null);
            produit.setFournisseur(lamag);
            produit.setImage(null);
            produitRepository.save(produit);
            System.out.println("produits seedées !");
        } else {
            System.out.println("produits déjà présentes, skip");
        }
    }
    
}

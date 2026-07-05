package com.maven.seeder;
import org.springframework.stereotype.Component;
import com.maven.model.Fournisseur;
import com.maven.repository.FournisseurRepository;

@Component
public class FournisseurSeeder {
    private final FournisseurRepository fournisseurRepository; 
   
    public FournisseurSeeder(FournisseurRepository fournisseurRepository) {
        this.fournisseurRepository = fournisseurRepository;
    }
    public void seedFournisseur() {
        if (fournisseurRepository.count() == 0) {
            Fournisseur fournisseur = new Fournisseur();
            fournisseur.setNom("lamag");
            fournisseur.setAdresse("rue saint trophin");
            fournisseur.setEmail("lamag@gmail.com");
            fournisseurRepository.save(fournisseur);
            System.out.println("fournisseur seedées !");
        } else {
            System.out.println("produit deja présent");
        }
    }
}
package maven.repository;

import maven.model.Fournisseur;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FournisseurRepository extends JpaRepository<Fournisseur, Integer> {
    
    List<Fournisseur> findByNomContaining(String nom);
    List<Fournisseur> findByAdresseContaining(String adresse);
    List<Fournisseur> findByEmailContaining(String email);

}
package com.maven.repository;

import com.maven.model.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FournisseurRepository extends JpaRepository<Fournisseur, Integer> {
    List<Fournisseur> findByNomContaining(String nom);
    List<Fournisseur> findByAdresseContaining(String adresse);
    List<Fournisseur> findByEmailContaining(String email);
}
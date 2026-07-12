package com.maven.repository;

import com.maven.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Integer> {
    List<Commande> findByUserId(int userId);
    List<Commande> findByArticleCommandesId(int articleCommandeId);
    List<Commande> findByUserPseudoContainingIgnoreCase(String pseudo);
}
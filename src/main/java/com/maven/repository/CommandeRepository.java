package com.maven.repository;

<<<<<<< HEAD
import com.maven.model.Commande;
=======
>>>>>>> PageVisiteur
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maven.model.Commande;

import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Integer> {
    
    List<Commande> findByArticleCommandeId(int articleCommandeId);

}



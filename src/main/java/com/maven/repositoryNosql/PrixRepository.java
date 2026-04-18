package com.maven.repositoryNosql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maven.modelNosql.Prix;

import java.util.List;

public interface PrixRepository extends JpaRepository<Prix, Integer> {
    
    List<Prix> findByProduitPhare(int Id);
    List<Prix> findByPrixTotal(int prixTotal);
    List<Prix> findByRemboursement(int remboursement);
    List<Prix> findByAchat(int achat);
    List<Prix> findByDate(String date);
    


}

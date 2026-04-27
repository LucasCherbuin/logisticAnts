package com.maven.repositoryNosql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.maven.modelNosql.Prix;
import java.util.List;

public interface PrixRepository extends JpaRepository<Prix, Integer> {
<<<<<<< HEAD
    
    List<Prix> findByProduitPhare(int Id);
    List<Prix> findByPrixTotal(int prixTotal);
    List<Prix> findByRemboursement(int remboursement);
    List<Prix> findByAchat(int achat);
    List<Prix> findByDate(String date);
    


}
=======
    List<Prix> findByProduit(int produit);
    List<Prix> findByAchat(int achat);
}
>>>>>>> 5a82615 (correction back end)

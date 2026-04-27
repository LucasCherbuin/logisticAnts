package com.maven.repositoryNosql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.maven.modelNosql.ProduitPhare;
import java.sql.Date;
import java.util.List;

@Repository
public interface ProduitPhareRepository extends JpaRepository<ProduitPhare, Integer> {
<<<<<<< HEAD

    List<ProduitPhare> findByPrix(int Id);
    List<ProduitPhare> findByProduit(int produit);
    List<ProduitPhare> findByAchat(int achat);


}
=======
    List<ProduitPhare> findByPrixTotal(int prixTotal);
    List<ProduitPhare> findByRemboursement(int remboursement);
    List<ProduitPhare> findByAchat(int achat);
    List<ProduitPhare> findByDate(Date date);
}
>>>>>>> 5a82615 (correction back end)

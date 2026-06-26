package com.maven.repositoryNosql;

import com.maven.modelNosql.ProduitPhare;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProduitPhareRepository extends MongoRepository<ProduitPhare, String> {
    List<ProduitPhare> findByProduit(int produit);
    List<ProduitPhare> findByAchat(int achat);
}
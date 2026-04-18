package com.maven.repositoryNosql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maven.modelNosql.ProduitPhare;

import java.util.List;

@Repository
public interface ProduitPhareRepository extends JpaRepository<ProduitPhare, Integer> {

    List<ProduitPhare> findByPrix(int Id);
    List<ProduitPhare> findByProduit(int produit);
    List<ProduitPhare> findByAchat(int achat);


}

package com.maven.repositoryNosql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.maven.modelNosql.Prix;
import java.util.List;

public interface PrixRepository extends JpaRepository<Prix, Integer> {
    List<Prix> findByProduit(int produit);
    List<Prix> findByAchat(int achat);
}

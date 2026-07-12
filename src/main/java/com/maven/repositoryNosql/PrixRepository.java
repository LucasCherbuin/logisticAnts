package com.maven.repositoryNosql;

import com.maven.modelNosql.Prix;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface PrixRepository extends MongoRepository<Prix, String> {
    List<Prix> findByPrixTotal(int prixTotal);
    List<Prix> findByRemboursement(int remboursement);
    List<Prix> findByAchat(int achat);
    List<Prix> findByDate(Date date);
}

package repository;

import model.ArticleCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleCommandeRepository extends JpaRepository<ArticleCommande, Integer> {

    List<ArticleCommande> findByCommandeId(int commandeId);
}

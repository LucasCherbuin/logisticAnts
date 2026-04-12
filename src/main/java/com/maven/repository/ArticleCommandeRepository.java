package com.maven.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maven.model.ArticleCommande;

import java.util.List;

@Repository
public interface ArticleCommandeRepository extends JpaRepository<ArticleCommande, Integer> {

    List<ArticleCommande> findByCommandeId(int commandeId);
}

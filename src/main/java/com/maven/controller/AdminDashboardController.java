package com.maven.controller;
import org.springframework.web.bind.annotation.RestController;
import com.maven.modelNosql.Prix;
import org.springframework.web.bind.annotation.GetMapping;
import com.maven.repositoryNosql.PrixRepository;
import com.maven.modelNosql.ProduitPhare;
import com.maven.repositoryNosql.ProduitPhareRepository;
import java.util.HashMap;
import java.util.Map;

import java.util.List;


public class AdminDashboardController {
    
    @RestController

    public class DashboardPrixController {

        private final PrixRepository prixRepository;

        public DashboardPrixController(PrixRepository prixRepository) {
            this.prixRepository = prixRepository;
        }

        //DashBoard pour les prix total des produits, on affiche la liste des prix avec le total des achats et des produits
        @GetMapping("/dashboard/prix")
        public List<Prix> getAllPrix() {
            return prixRepository.findAll();
        }
    }
    @RestController
    public class DashboardProduitPhareController {

        private final ProduitPhareRepository produitPhareRepository;

        public DashboardProduitPhareController(ProduitPhareRepository produitPhareRepository) {
            this.produitPhareRepository = produitPhareRepository;
        }

        //DashBoard pour les produits phares, on affiche la liste des produits phares avec le total des remboursements et des achats
        @GetMapping("/dashboard/produits-phare")
        public Map<String, Object> getAllProduitsPhare(){

            List<ProduitPhare> produits = produitPhareRepository.findAll();

            Map<String, Object> response = new HashMap<>();
            response.put("produits", produits);

            int remboursement = produits.stream()
                .mapToInt(ProduitPhare::getRemboursement)
                .sum();

            int achat = produits.stream()
                .mapToInt(ProduitPhare::getAchat)
                .sum();

            response.put("remboursement", remboursement);
            response.put("achat", achat);

            return response;
        }
    }
}

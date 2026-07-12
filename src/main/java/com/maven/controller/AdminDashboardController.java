package com.maven.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.maven.modelNosql.Prix;
import com.maven.modelNosql.ProduitPhare;
import com.maven.repositoryNosql.PrixRepository;
import com.maven.repositoryNosql.ProduitPhareRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AdminDashboardController {

    private final ProduitPhareRepository produitPhareRepository;
    private final PrixRepository prixRepository;

    public AdminDashboardController(ProduitPhareRepository produitPhareRepository, PrixRepository prixRepository) {
        this.produitPhareRepository = produitPhareRepository;
        this.prixRepository = prixRepository;
    }

    @GetMapping("/dashboard/produitPhare")
    public Map<String, Object> getAllProduitPhare() {
        List<ProduitPhare> produits = produitPhareRepository.findAll();
        int totalAchats = produits.stream().mapToInt(ProduitPhare::getAchat).sum();
        Map<String, Object> response = new HashMap<>();
        response.put("produits", produits);
        response.put("achats", totalAchats);
        return response;
    }

     @PostMapping("/dashboard/produitPhare")
    public ProduitPhare createProduitPhare(@RequestBody ProduitPhare produitPhare) {
        return produitPhareRepository.save(produitPhare);
    }

    @GetMapping("/dashboard/prix")
    public Map<String, Object> getAllPrix() {
        List<Prix> prixs = prixRepository.findAll();
        Map<String, Object> response = new HashMap<>();
        response.put("prixTotal", prixs.stream().mapToInt(Prix::getPrixTotal).sum());
        response.put("remboursement", prixs.stream().mapToInt(Prix::getRemboursement).sum());
        response.put("achat", prixs.stream().mapToInt(Prix::getAchat).sum());
        response.put("date", new java.util.Date());
        return response;
    }

    @PostMapping("/dashboard/prix")
    public Prix createPrix(@RequestBody Prix prix) {
        return prixRepository.save(prix);
    }


    }

package com.maven.controller;



import com.maven.modelNosql.*;
import com.maven.repositoryNosql.*;
import com.maven.dto.AdminDashboardResponse;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:4200")

public class AdminDashboardController {

    private final PrixRepository prixRepository;
    private final ProduitPhareRepository produitPhareRepository;

    public AdminDashboardController(PrixRepository prixRepository, ProduitPhareRepository produitPhareRepository) {
        this.prixRepository = prixRepository;
        this.produitPhareRepository = produitPhareRepository;
    }


    @GetMapping
    public AdminDashboardResponse getAdminDashboard() {

        List<Prix> prixs = prixRepository.findAll();
        List<ProduitPhare> produitPhares = produitPhareRepository.findAll();

        int remboursement = prixs.stream()
                .mapToInt(Prix::getRemboursement)
                .sum();

        int Achat = prixs.stream()
                .mapToInt(Prix::getAachat)
                .sum();

        int totalProduits = prixs.size();

        int produit = produitPhares.stream()
                .mapToInt(ProduitPhare::getProduit)
                .sum();
        
        int achat = produitPhares.stream()
                .mapToInt(ProduitPhare::getAchat)
                .sum();

        return new AdminDashboardResponse(prixs, remboursement, Achat, totalProduits, produitPhares, produit, achat);
    }


}
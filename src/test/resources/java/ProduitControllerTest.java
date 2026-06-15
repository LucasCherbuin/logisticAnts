package com.maven.test;

import com.maven.controller.ProduitController;
import com.maven.model.Produit;
import com.maven.repository.ProduitRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;


import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertTrue;

@WebMvcTest(ProduitController.class)
@Import(ProduitControllerTest.TestConfig.class) //

class ProduitControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProduitRepository produitRepository;

    @TestConfiguration
    static class TestConfig {
        // Configuration de test si nécessaire
    }

    @Test
    void testGetAllProduits() throws Exception {

        Fournisseur fournisseur = new Fournisseur();
            fournisseur.setId(1);
        Image image = new Image();
            image.setId(1);

        Produit p1 = new Produit();
            p1.setId(1);
            p1.setNom("Produit A");
            p1.setPrix(10);
            p1.setQuantiteStock(5);
            p1.setDerniereAjout(Date.valueOf("2024-01-01"));
            p1.setPerissable(false);
            p1.setFournisseur(fournisseur);
            p1.setImage(image);

        Produit p2 = new Produit();
            p2.setId(2);
            p2.setNom("Produit B");
            p2.setPrix(20);
            p2.setQuantiteStock(5);
            p2.setDerniereAjout(Date.valueOf("2024-01-02"));
            p2.setPerissable(true);
            p2.setDatePeremption(Date.valueOf("2024-02-02"));
            p2.setFournisseur(fournisseur);
            p2.setImage(image);

            when(produitRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        String response = mockMvc.perform(get("/produits"))
                                .andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        Produit[] produits = objectMapper.readValue(response, Produit[].class);

            assertTrue(produits.length == 2);
            assertTrue(produits[0].getNom().equals("Produit A"));
            assertTrue(produits[1].getNom().equals("Produit B"));
    }
}
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
        // Création de deux produits
        Produit p1 = new Produit(1, "Produit A", 10.0, 5, 01/01/2024, false, null, 1, 1);
        Produit p2 = new Produit(2, "Produit B", 20.0, 5, 02/01/2024, true, 02/02/2024, 1, 1);

      
        // Mock du repository
        when(produitRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        // Exécution de la requête GET /produits
        String response = mockMvc.perform(get("/produits"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Produit[] produits = objectMapper.readValue(response, Produit[].class);

        // Vérification des produits retournés
        assertTrue(produits.length == 2);
        assertTrue(produits[0].getNom().equals("Produit A"));
        assertTrue(produits[1].getNom().equals("Produit B"));
    }
}
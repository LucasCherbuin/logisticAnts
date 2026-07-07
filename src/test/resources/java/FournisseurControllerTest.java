package com.maven.test;

import com.maven.controller.FournisseurController;
import com.maven.model.Fournisseur;
import com.maven.repository.FournisseurRepository;
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

@WebMvcTest(FournisseurController.class)
@Import(FournisseurControllerTest.TestConfig.class) //

class FournisseurControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private FournisseurRepository fournisseurRepository;

    @TestConfiguration
    static class TestConfig {
        // Configuration de test si nécessaire
    }

    @Test
    void testGetAllFournisseurs() throws Exception {
        // Création de deux fournisseurs
        Fournisseur f1 = new Fournisseur(1, "Fournisseur A", "Adresse A", "email@example1.com");
        Fournisseur f2 = new Fournisseur(2, "Fournisseur B", "Adresse B", "email@example2.com");

        // Mock du repository
        when(fournisseurRepository.findAll()).thenReturn(Arrays.asList(f1, f2));

        // Exécution de la requête GET /fournisseurs
        String response = mockMvc.perform(get("/fournisseurs"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Fournisseur[] fournisseurs = objectMapper.readValue(response, Fournisseur[].class);

        // Vérification des fournisseurs retournés
        assertTrue(fournisseurs.length == 2);
        assertTrue(fournisseurs[0].getNom().equals("Fournisseur A"));
        assertTrue(fournisseurs[1].getNom().equals("Fournisseur B"));
    }
}
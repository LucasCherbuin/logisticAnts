package java;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.maven.controller.AdminDashboardController;
import com.maven.modelNosql.Prix;
import com.maven.repositoryNosql.PrixRepository;
import com.maven.modelNosql.ProduitPhare;
import com.maven.repositoryNosql.ProduitPhareRepository;


import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(AdminDashboardController.class)

public class AdminDashboardControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PrixRepository prixRepository;

    @MockBean
    private ProduitPhareRepository produitPhareRepository;

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testGetAllPrix() throws Exception {

        Prix p1 = new Prix(1, 1, 10);
        Prix p2 = new Prix(2, 2, 20);

        List<Prix> mockList = Arrays.asList(p1, p2);

        when(prixRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        mockMvc.perform(get("/dashboard/prix"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(2))
               .andExpect(jsonPath("$[0].produit").value(1))
               .andExpect(jsonPath("$[0].achat").value(10))
               .andExpect(jsonPath("$[1].produit").value(2))
               .andExpect(jsonPath("$[1].achat").value(20));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testGetAllProduitsPhare() throws Exception {

        ProduitPhare p1 = new ProduitPhare(1, 10, -2);
        ProduitPhare p2 = new ProduitPhare(2, 50, -20);

        List<ProduitPhare> mockList = Arrays.asList(p1, p2);

        when(produitPhareRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        mockMvc.perform(get("/dashboard/produits-phare"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.produits.length()").value(2))
               .andExpect(jsonPath("$.produits[0].achat").value(10))
               .andExpect(jsonPath("$.produits[0].remboursement").value(-2))
               .andExpect(jsonPath("$.produits[1].achat").value(50))
               .andExpect(jsonPath("$.produits[1].remboursement").value(-20));
    }
}

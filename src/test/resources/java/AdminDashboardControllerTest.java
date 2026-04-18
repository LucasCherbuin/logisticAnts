package java;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.maven.controller.DashboardController;
import com.maven.modelNosql.*;
import com.maven.repositoryNosql.*;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DashboardController.class)
public class DashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProduitPhareRepository produitPhareRepository;
    private PrixRepository prixRepositpory;

    @Test
    void testGetDashboard() throws Exception {

        ProduitPhare p1 = new ProduitPhare(1, 10, 2);
        Prix p2 = new Prix(2, 20, 3, 1);

        List<ProduitPhare> produits = Arrays.asList(p1);
        List<Prix> prixs = Arrays.asList(p2);

        when(produitPhareRepository.findAll()).thenReturn(produits);
        when(prixRepository.findAll()).thenReturn(prixs);

        mockMvc.perform(get("/api/dashboard"))
                .andExpect(status().isOk())

                //  tableau produits
                .andExpect(jsonPath("$.produits.length()").value(2))
                .andExpect(jsonPath("$.produits[0].poduit").value(10))
                .andExpect(jsonPath("$.produits[1].achat").value(20))

                // tableau prix
                .andExpect(jsonPath("$.Achat").value(30))
                .andExpect(jsonPath("$.remboursement").value(5))
                .andExpect(jsonPath("$.totalProduits").value(2))
                .andExpect(jsonPath("$.date").value(22-01-2022));
    }
}
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import controller.ArticleCommandeController;
import model.ArticleCommande;
import repository.ArticleCommandeRepository;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(ArticleCommandeController.class)
class ArticleCommandeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArticleCommandeRepository articleCommandeRepository;

    @Test
    @WithMockUser(username = "jean", roles = {"CLIENT"})
    void testGetAllArticleCommandes() throws Exception {

        ArticleCommande a1 = new ArticleCommande(1, 1, 10);
        ArticleCommande a2 = new ArticleCommande(2, 2, 20);

        List<ArticleCommande> mockList = Arrays.asList(a1, a2);

        when(articleCommandeRepository.findAll()).thenReturn(Arrays.asList(a1, a2));

        mockMvc.perform(get("/articleCommandes"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(2))
               .andExpect(jsonPath("$[0].produitId").value(1))
               .andExpect(jsonPath("$[0].quantite").value(10))
               .andExpect(jsonPath("$[1].produitId").value(2))
               .andExpect(jsonPath("$[1].quantite").value(20));
    }
}

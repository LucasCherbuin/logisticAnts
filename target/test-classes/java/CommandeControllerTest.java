import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.maven.controller.CommandeController;
import com.maven.model.Commande;
import com.maven.repository.CommandeRepository;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(CommandeController.class)
class CommandeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommandeRepository commandeRepository;

    @Test
    @WithMockUser(username = "Jean", roles = {"CLIENT"})
    void testGetAllCommandes() throws Exception {

        // Création des utilisateurs fictifs
        User user1 = new User();
            user1.setId(1);
            user1.setPseudo("Jean");
        User user2 = new User();
            user2.setId(2);
            user2.setPseudo("Paul");

        // Création des articles de commande fictifs
        ArticleCommande ac1 = new ArticleCommande();
            ac1.setId(101);
        ArticleCommande ac2 = new ArticleCommande();
            ac2.setId(102);

        ArticleCommande ac3 = new ArticleCommande();
            ac3.setId(201);
        ArticleCommande ac4 = new ArticleCommande();
            ac4.setId(202);

        // Création des commandes avec relations
        Commande c1 = new Commande();
            c1.setUser(user1);
            c1.setArticleCommandes(Arrays.asList(ac1, ac2));

        Commande c2 = new Commande();
            c2.setUser(user2);
            c2.setArticleCommandes(Arrays.asList(ac3, ac4));

        List<Commande> mockList = Arrays.asList(c1, c2);

        when(commandeRepository.findAll()).thenReturn(Arrays.asList(c1, c2));

        mockMvc.perform(get("/commandes"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(2))
               .andExpect(jsonPath("$[0].user.id").value(1))
               .andExpect(jsonPath("$[0].articleCommandes.length()").value(2))
               .andExpect(jsonPath("$[0].articleCommandes[0].id").value(101))
               .andExpect(jsonPath("$[0].articleCommandes[1].id").value(102))
               .andExpect(jsonPath("$[1].user.id").value(2))
               .andExpect(jsonPath("$[1].articleCommandes.length()").value(2))
               .andExpect(jsonPath("$[1].articleCommandes[0].id").value(201))
               .andExpect(jsonPath("$[1].articleCommandes[1].id").value(202));
    }
}

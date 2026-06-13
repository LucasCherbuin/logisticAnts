import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.maven.controller.CommandeController;
import com.maven.model.ArticleCommande;
import com.maven.model.Commande;
import com.maven.model.User;
import com.maven.repository.CommandeRepository;
import javax.sql.rowset.serial.SerialBlob;
import java.nio.charset.StandardCharsets;

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

        // Fake Blob
        byte[] fakeData = "facture test".getBytes(StandardCharsets.UTF_8);
        Blob fakeBlob = new SerialBlob(fakeData);

        // Users
        User user1 = new User();
        user1.setId(1);
        user1.setPseudo("Jean");

        User user2 = new User();
        user2.setId(2);
        user2.setPseudo("Paul");

        // Articles
        ArticleCommande ac1 = new ArticleCommande();
        ac1.setId(101);

        ArticleCommande ac2 = new ArticleCommande();
        ac2.setId(102);

        ArticleCommande ac3 = new ArticleCommande();
        ac3.setId(201);

        ArticleCommande ac4 = new ArticleCommande();
        ac4.setId(202);

        // Commande 1
        Commande c1 = new Commande();
<<<<<<< HEAD
            c1.setUser(user1);
            c1.setArticleCommandes(Arrays.asList(ac1, ac2));
=======
        c1.setId(1);
        c1.setUser(user1);
        c1.setArticles(Arrays.asList(ac1, ac2));
        c1.setPayement("mastercard");
        c1.setFacture(fakeBlob);
>>>>>>> PageClient

        // Commande 2
        Commande c2 = new Commande();
<<<<<<< HEAD
            c2.setUser(user2);
            c2.setArticleCommandes(Arrays.asList(ac3, ac4));
=======
        c2.setId(2);
        c2.setUser(user2);
        c2.setArticles(Arrays.asList(ac3, ac4));
        c2.setPayement("paypal");
        c2.setFacture(fakeBlob);
>>>>>>> PageClient

        List<Commande> mockList = Arrays.asList(c1, c2);

        when(commandeRepository.findAll()).thenReturn(mockList);

        mockMvc.perform(get("/commandes"))
<<<<<<< HEAD
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
=======
            .andExpect(status().isOk())

            // Taille
            .andExpect(jsonPath("$.length()").value(2))

            // Commande 1
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].payement").value("mastercard"))

            // Commande 2
            .andExpect(jsonPath("$[1].id").value(2))
            .andExpect(jsonPath("$[1].payement").value("paypal"));
>>>>>>> PageClient
    }
}
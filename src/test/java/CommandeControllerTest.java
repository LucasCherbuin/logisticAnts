import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import controller.CommandeController;
import model.Commande;
import repository.CommandeRepository;

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

        Commande c1 = new Commande(1, 1, 1);
        Commande c2 = new Commande(2, 2, 2);

        List<Commande> mockList = Arrays.asList(c1, c2);

        when(commandeRepository.findAll()).thenReturn(Arrays.asList(c1, c2));

        mockMvc.perform(get("/commandes"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(2))
               .andExpect(jsonPath("$[0].articleCommandeId").value(1))
               .andExpect(jsonPath("$[0].userId").value(1))
               .andExpect(jsonPath("$[1].articleCommandeId").value(2))
               .andExpect(jsonPath("$[1].userId").value(2));
    }
}

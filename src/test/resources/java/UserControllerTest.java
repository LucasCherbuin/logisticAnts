<<<<<<< HEAD
package com.maven.test;

import com.maven.controller.UserController;
import com.maven.model.User;
import com.maven.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
=======
import java.util.Arrays;
import java.util.List;

>>>>>>> PageVisiteur
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
<<<<<<< HEAD
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

=======
>>>>>>> PageVisiteur
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

<<<<<<< HEAD
import java.util.Arrays;
=======
import com.fasterxml.jackson.databind.ObjectMapper;
import com.maven.controller.UserController;
import com.maven.model.User;
import com.maven.repository.UserRepository;
>>>>>>> PageVisiteur

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertTrue;

@WebMvcTest(UserController.class)
<<<<<<< HEAD
@Import(UserControllerTest.TestConfig.class) // importe la configuration de test
=======
>>>>>>> PageVisiteur
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

<<<<<<< HEAD
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @MockBean
    private UserRepository userRepository;

    // TestConfiguration pour fournir un vrai PasswordEncoder
    @TestConfiguration
    static class TestConfig {
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }
=======
    @MockBean
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
>>>>>>> PageVisiteur

    @Test
    @WithMockUser(username = "jean", roles = {"CLIENT"})
    void testGetAllUsers() throws Exception {
<<<<<<< HEAD
        // Création de deux utilisateurs avec mot de passe encodé
        User u1 = new User(1, "John", "john@example.com", passwordEncoder.encode("password123"), 1);
        User u2 = new User(2, "Jane", "jane@example.com", passwordEncoder.encode("password456"), 2);

        // Mock du repository
        when(userRepository.findAll()).thenReturn(Arrays.asList(u1, u2));

        // Exécution de la requête GET /users
        String response = mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        User[] users = objectMapper.readValue(response, User[].class);

        // Vérification des mots de passe
        assertTrue(passwordEncoder.matches("password123", users[0].getPassword()));
        assertTrue(passwordEncoder.matches("password456", users[1].getPassword()));
    }
}
=======

        User u1 = new User(1, "John", "john@example.com", passwordEncoder.encode("password123"), 1);
        User u2 = new User(2, "Jane", "jane@example.com", passwordEncoder.encode("password456"), 2);

        List<User> mockList = Arrays.asList(u1, u2);

        when(userRepository.findAll()).thenReturn(Arrays.asList(u1, u2));

        String response = mockMvc.perform(get("/users"))
                                 .andExpect(status().isOk())
                                 .andReturn()
                                 .getResponse()
                                 .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        User[] users = mapper.readValue(response, User[].class);

        assertTrue(passwordEncoder.matches("password123", users[0].getPassword()));
        assertTrue(passwordEncoder.matches("password456", users[1].getPassword()));
    }
}
>>>>>>> PageVisiteur

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.maven.controller.UserController;
import com.maven.model.User;
import com.maven.repository.UserRepository;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertTrue;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    @WithMockUser(username = "jean", roles = {"CLIENT"})
    void testGetAllUsers() throws Exception {

        Role role1 = new Role();
            role1.setId(1);
            role1.setLabel("CLIENT");

        Role role2 = new Role();
            role2.setId(2);
            role2.setLabel("ADMIN");

        User u1 = new User();
            u1.setId(1);
            u1.setPseudo("John");
            u1.setEmail("john@example.com");
            u1.setPassword(passwordEncoder.encode("password123"));
            u1.setRole(role1);

        User u2 = new User();
            u2.setId(2);
            u2.setPseudo("Jane");
            u2.setEmail("jane@example.com");
            u2.setPassword(passwordEncoder.encode("password456"));
            u2.setRole(role2);

            when(userRepository.findAll()).thenReturn(Arrays.asList(u1, u2));

        String response = mockMvc.perform(get("/users"))
                                    .andExpect(status().isOk())
                                    .andReturn()
                                    .getResponse()
                                    .getContentAsString();

        User[] users = mapper.readValue(response, User[].class);

            assertTrue(passwordEncoder.matches("password123", users[0].getPassword()));
            assertTrue(passwordEncoder.matches("password456", users[1].getPassword()));
            assertTrue(users[0].getRole().getLabel().equals("CLIENT"));
            assertTrue(users[1].getRole().getLabel().equals("ADMIN"));
    }
}

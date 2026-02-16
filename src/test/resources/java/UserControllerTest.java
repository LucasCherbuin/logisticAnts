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

package com.maven.service;

import com.maven.model.Role;
import com.maven.model.User;
import com.maven.repository.RoleRepository;
import com.maven.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldRegisterUserWithClientRole() {

        Role role = new Role();
        role.setName("CLIENT");

        when(roleRepository.findByName("CLIENT"))
                .thenReturn(Optional.of(role));

        when(passwordEncoder.encode("1234"))
                .thenReturn("encodedPassword");

        User savedUser = new User();
        savedUser.setPseudo("lucas");

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

 
        User result = authService.register("lucas", "lucas@mail.com", "1234");


        assertNotNull(result);
        verify(roleRepository).findByName("CLIENT");
        verify(passwordEncoder).encode("1234");
        verify(userRepository).save(any(User.class));
    }
}
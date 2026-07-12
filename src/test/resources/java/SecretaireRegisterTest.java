package com.maven.service;

import com.maven.model.Role;
import com.maven.model.User;
import com.maven.repository.RoleRepository;
import com.maven.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SecretaireRegisterTest {

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SecretaireRegister secretaireRegister;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldRegisterUserWithLogisticienRole() {
  
        Role role = new Role();
        role.setLabel("LOGISTICIEN");

        when(roleRepository.findByLabel("LOGISTICIEN"))
                .thenReturn(Optional.of(role));

        User savedUser = new User();
        savedUser.setPseudo("test");

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        User result = secretaireRegister.register(
                "test",
                "test@mail.com",
                "1234",
                "LOGISTICIEN"
        );


        assertNotNull(result);
        verify(roleRepository).findByLabel("LOGISTICIEN");
        verify(userRepository).save(any(User.class));
    }
}
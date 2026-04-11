package com.maven.test;

import com.maven.Service.UserService;
import com.maven.model.User;
import com.maven.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // <-- initialisation des mocks
    }

    @Test
    public void testFindUserById() {
        User user = new User();
        user.setId(1);
        user.setPseudo("John Doe");

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.findUserById(1);

        assertTrue(foundUser.isPresent());
        assertEquals("John Doe", foundUser.get().getPseudo());
    }

    @Test
    public void testCreateUser() {
        User user = new User();
        user.setPseudo("Jane Doe");

        when(userRepository.save(user)).thenReturn(user);

        User createdUser = userService.createUser(user);

        assertEquals("Jane Doe", createdUser.getPseudo());
    }

    @Test
    public void testDeleteUser() {
        doNothing().when(userRepository).deleteById(2);

        userService.deleteUser(2);

        verify(userRepository, times(1)).deleteById(2);
    }

    @Test
    public void testUpdateUser() {
        User user = new User();
        user.setId(3);
        user.setPseudo("Old Pseudo");

        when(userRepository.findById(3)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        user.setPseudo("New Pseudo");
        User updatedUser = userService.updateUser(user);

        assertEquals("New Pseudo", updatedUser.getPseudo());
    }
}
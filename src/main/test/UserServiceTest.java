package main.test;

import org.junit.Test;

public class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testFindUserById() {
        User user = new User();
        user.setId(1);
        user.setName("John Doe");

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.findUserById(1);

        assertTrue(foundUser.isPresent());
        assertEquals("John Doe", foundUser.get().getName());
    }

    @Test
    public void testCreateUser() {
        User user = new User();
        user.setName("Jane Doe");

        when(userRepository.save(user)).thenReturn(user);

        User createdUser = userService.createUser(user);

        assertEquals("Jane Doe", createdUser.getName());
    }

    @Test
    public void testDeleteUser() {  
        User user = new User();
        user.setId(2);

        doNothing().when(userRepository).deleteById(2);

        userService.deleteUser(2);

        verify(userRepository, times(1)).deleteById(2);
    }

    @Test
    public void testUpdateUser() {
        User user = new User();
        user.setId(3);
        user.setName("Old Name");

        when(userRepository.findById(3)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        user.setName("New Name");
        User updatedUser = userService.updateUser(user);

        assertEquals("New Name", updatedUser.getName());
    }

    
}

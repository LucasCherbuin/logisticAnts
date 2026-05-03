package java;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;



public class JwtServiceTest {
    
    @Test
    public void testGenerateToken() {
        // Arrange
        String token = JwtServiceTest.generateToken("testUser");

        assertNotNull(token);

        boolean isValid = JwtServiceTest.validateToken(token);

        assertTrue(isValid);

        String username = JwtServiceTest.getUsernameFromToken(token);

        assertEquals("testUser", username);
    }
}

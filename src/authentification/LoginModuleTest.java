package autorization;

import org.junit.jupiter.api.Test;

import javax.security.auth.Subject;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.login.LoginContext;

import static org.junit.jupiter.api.Assertions.*;

public class LoginModuleTest {
    
    @test 
    void testLoginModule() {
        try {
            CallbackHandler callbackHandler = new java.security.CallbackHandler();
            LoginContext loginContext = new LoginContext("TestLoginModule", new Subject(), callbackHandler);
            loginContext.login();
            Subject subject = loginContext.getSubject();
            assertNotNull(subject);
            assertFalse(subject.getPrincipals().isEmpty());
            System.out.println("Login successful. Principals: " + subject.getPrincipals());
        } catch (Exception e) {
            fail("Login failed with exception: " + e.getMessage());
        }
    }
}

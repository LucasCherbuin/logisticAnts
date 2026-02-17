package com.maven.test;

import org.junit.jupiter.api.Test;
import javax.security.auth.Subject;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.login.LoginContext;


public class LoginModuleTest {

    @Test
    void testLoginModule() {
        System.setProperty("java.security.auth.login.config", "src/test/resources/login.config");

        
        try {
            // Implémentation minimale de CallbackHandler
            CallbackHandler callbackHandler = callbacks -> {
                // Tu peux ajouter une gestion des callbacks si nécessaire
            };

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

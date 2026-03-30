package com.maven.test;

import javax.security.auth.Subject;
import javax.security.auth.callback.*;
import javax.security.auth.login.LoginException;
import javax.security.auth.spi.LoginModule;
import java.util.Map;

public class DummyLoginModule implements LoginModule {

    private Subject subject;
    private CallbackHandler callbackHandler;

    private String username;
    private boolean success = false;

    @Override
    public void initialize(Subject subject,
                           CallbackHandler callbackHandler,
                           Map<String, ?> sharedState,
                           Map<String, ?> options) {

        this.subject = subject;
        this.callbackHandler = callbackHandler;
    }

    @Override
    public boolean login() throws LoginException {

        // Création des callbacks pour récupérer username et password
        Callback[] callbacks = new Callback[]{
                new NameCallback("username"),
                new PasswordCallback("password", false)
        };

        try {
            // Appel du handler (utilisé par Angular ou les tests)
            callbackHandler.handle(callbacks);

            // Récupération des valeurs saisies
            username = ((NameCallback) callbacks[0]).getName();
            String password = new String(((PasswordCallback) callbacks[1]).getPassword());

            // Vérification des identifiants (dummy)
            if ("admin".equals(username) && "1234".equals(password)) {
                success = true;
                return true;
            }

            // Mauvais identifiants
            throw new LoginException("Invalid credentials");

        } catch (Exception e) {
            throw new LoginException(e.getMessage());
        }
    }

    @Override
    public boolean commit() {

        // Si authentification réussie, on ajoute un Principal au Subject
        if (success) {
            subject.getPrincipals().add(() -> username);
            return true;
        }

        return false;
    }

    @Override
    public boolean abort() {
        // Appelé en cas d’échec ou interruption
        return false;
    }

    @Override
    public boolean logout() {
        // Nettoyage du Subject lors de la déconnexion
        subject.getPrincipals().clear();
        return true;
    }
}
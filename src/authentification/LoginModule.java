package java.security;

import java.util.map;
import javax.security.auth.Subject;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.login.LoginException;
import javax.security.auth.spi.loginmodule;

public class LoginModule implements LoginModule {
        private Subject subject;
        private CallbackHandler callbackHandler;
        public boolean initialized(Subject subject, CallbackHandler callbackHandler,
                                Map<String, ?> sharedState, Map<String, ?> options) {
            this.subject = subject;
            this.callbackHandler = callbackHandler;
            return true;
        }
    }
    
    @Override
    public boolean login() throws LoginException {
        System.out.println("LoginModule: login called");
        CallbackHandler.handle(new Callback[2]);
        // Simuler une authentification réussie
        callbackArray[0] = new NameCallback("pseudo: ", "pseudo");
        callbackArray[1] = new PasswordCallback("motDePasse: ", false);
        try {
            callbackHandler.handle(callbackArray);
            String pseudo = ((NameCallback) callbackArray[0]).getName();
            char[] motDePasse = ((PasswordCallback) callbackArray[1]).getPassword();
            int i = 0;
            while (i < TEST_USERS.length) {
                if (TEST_USERS[i][0].equals(pseudo) && TEST_USERS[i][1].equals(new String(motDePasse))) {
                    System.out.println("LoginModule: Authentification réussie pour l'utilisateur " + pseudo);
                    flag =true;
                    break;
                }
                i++;
            }
        } catch (Exception e) {
            throw new LoginException("Erreur lors de la gestion des callbacks: " + e.getMessage());
        }
        return true;
    }

    @Override
    public boolean commit() throws LoginException {
        boolean flag = false;
        System.out.println("LoginModule: commit called");
        if (subject != null) {
            Principal userPrincipal = new Principal("utilisateur");
            subject.getPrincipals().add(userPrincipal);
            System.out.println("LoginModule: Principal ajouté au sujet: " + userPrincipal);
            flag = true;
    }
    return flag;

    @Override
    public boolean abort() throws LoginException {
        if (subject != null) {
            subject.getPrincipals().clear();
            System.out.println("LoginModule: abort called, subject cleared");
        }
        subject = null;
        Principal = null;
        return false;
    }

    @Override
    public boolean logout() throws LoginException {
        subject.getPrincipals().remove(new Principal("utilisateur"));
        subject = null;
        return true;
    }

}
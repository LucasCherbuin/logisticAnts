package java.security;

import java.nio.Buffer;

import javax.security.auth.login.LoginContext;
import javax.security.auth.login.LoginException;

public class Driver {
    public enum Action {Action1, Action2, logout};
    public static void main(String[] args) {
        System.out.println("Authentication en cours...");
        LoginContext lc;
        try {
            lc = new LoginContext("SampleLoginModule", new CallbackHandler());
            lc.login();
            System.out.println("Authentification réussie !");
        } catch (Exception e) {
            System.out.println("Échec de l'authentification : " + e.getMessage());
        }
    }
    boolean performAction(LoginContext loginContext) {
        boolean flag = true;
        System.out.println("Performing action with authenticated context.");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        System.out.println("Enter action (Action1, Action2, logout): ");
        try {
            switch (Action.valueOf(br.readLine())) {
                case Action1:
                    System.out.println("Action1 réalisée.");
                    break;
                case Action2:
                    System.out.println("Action2 réalisée.");
                    break;
                case logout:
                    loginContext.logout();
                    System.out.println("deconnexion reussi.");
                    flag = false;
                    break;
            }
            return flag;
        }   catch (illegalArgumentException e) {
                    System.out.println("commande invalide");
        }
    }
}

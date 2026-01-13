package java.security;

import java.util.jar.Attributes.Name;

import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;

public class CallbackHandler implements CallbackHandler {

    @Override
    public void handle(Callback[] callbacks) throws UnsupportedCallbackException {
        // Implementation of callback handling logic
        System.out.println("CallbackHandler: handle called with " + callbacks.length + " callbacks.");
        NameCallback nameCallback = (NameCallback) callbacks[0];
        System.out.println("Received name: " + nameCallback.getPseudo());
        nameCallback.setName("pseudo");
        PasswordCallback passwordCallback = (PasswordCallback) callbacks[1];
        System.out.println("Received password: " + new String(passwordCallback.getPassword()));
        passwordCallback.setPassword("motDePasse".toCharArray());
    }

}

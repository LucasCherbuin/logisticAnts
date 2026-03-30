package java.security;

import java.util.jar.Attributes.Name;
import org.mindrot.jbcrypt.BCrypt;
import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;

public class JAASCallbackHandler implements CallbackHandler {

    private final LoginRequest request;

    public JAASCallbackHandler(LoginRequest request) {
        this.request = request;
    }

    @Override
    public void handle(Callback[] callbacks) {

        for (Callback callback : callbacks) {

            if (callback instanceof NameCallback) {
    NameCallback nc = (NameCallback) callback;
    nc.setName(request.pseudo);
    }

    if (callback instanceof PasswordCallback) {
        PasswordCallback pc = (PasswordCallback) callback;
        pc.setPassword(request.password.toCharArray());
    }
        }
    }

    @Override
    public boolean login() throws LoginException {

        Callback[] callbacks = new Callback[]{
                new NameCallback("username"),
                new PasswordCallback("password", false)
        };

        try {
            callbackHandler.handle(callbacks);

            username = ((NameCallback) callbacks[0]).getName();
            String password = new String(((PasswordCallback) callbacks[1]).getPassword());

            // Récupère le hash stocké
            String storedHash = UserStore.getPassword(username);

            if (storedHash != null && BCrypt.checkpw(password, storedHash)) {
                success = true;
                return true;
            }

            throw new LoginException("Invalid credentials");

        } catch (Exception e) {
            throw new LoginException(e.getMessage());
        }
    }
}

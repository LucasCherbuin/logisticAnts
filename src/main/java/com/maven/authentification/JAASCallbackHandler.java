package com.maven.authentification;

import javax.security.auth.callback.*;

public class JAASCallbackHandler implements CallbackHandler {
    private final LoginRequest request;

    public JAASCallbackHandler(LoginRequest request) {
        this.request = request;
    }

    @Override
    public void handle(Callback[] callbacks) throws UnsupportedCallbackException {
        for (Callback callback : callbacks) {
            if (callback instanceof NameCallback nc) {
                nc.setName(request.pseudo);
            } else if (callback instanceof PasswordCallback pc) {
                pc.setPassword(request.password.toCharArray());
            }
        }
    }
}
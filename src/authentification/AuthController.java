package com.authentification;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.Subject;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.login.LoginContext;
import java.util.UUID;

@RestController
@RequestMapping("/")
public class AuthController {

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            CallbackHandler handler = new JAASCallbackHandler(request);

            LoginContext lc = new LoginContext("DummyLoginModule", handler);

            lc.login();

            Subject subject = lc.getSubject();

            if (subject != null && !subject.getPrincipals().isEmpty()) {

                String token = UUID.randomUUID().toString();

                return ResponseEntity.ok(new LoginResponse(token, request.pseudo));
            }

            return ResponseEntity.status(401).build();

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Login failed");
        }
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (UserStore.exists(request.pseudo)) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        // Hash du mot de passe
        String hashedPassword = BCrypt.hashpw(request.password, BCrypt.gensalt());

        UserStore.addUser(request.pseudo, hashedPassword);

        return ResponseEntity.ok("User registered successfully");
        }
}
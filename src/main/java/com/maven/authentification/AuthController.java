package com.maven.authentification;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String storedHash = UserStore.getPassword(request.pseudo);
        if (storedHash != null && BCrypt.checkpw(request.password, storedHash)) {
            String token = java.util.UUID.randomUUID().toString();
            return ResponseEntity.ok(new LoginResponse(token, request.pseudo));
        }
        return ResponseEntity.status(401).body("Login failed");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (UserStore.exists(request.pseudo)) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        String hashedPassword = BCrypt.hashpw(request.password, BCrypt.gensalt());
        UserStore.addUser(request.pseudo, hashedPassword);
        return ResponseEntity.ok("User registered successfully");
    }
}
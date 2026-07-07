package com.maven.authentification;

import com.maven.service.ClientRegister;
import com.maven.service.JwtService;
import com.maven.model.User;
import com.maven.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class AuthController {

    private final UserRepository userRepository;
    private final ClientRegister clientRegister;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository,
                          ClientRegister clientRegister,
                          JwtService jwtService) {
        this.userRepository = userRepository;
        this.clientRegister = clientRegister;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByPseudo(request.pseudo).orElse(null);

        if (user != null && user.checkPassword(request.password)) {
            String token = jwtService.generateToken(request.pseudo); // ← vrai JWT
            return ResponseEntity.ok(new LoginResponse(token, request.pseudo));
        }
        return ResponseEntity.status(401).body("Login failed");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByPseudo(request.pseudo).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        clientRegister.register(request.pseudo, request.email, request.password); 

        return ResponseEntity.ok("User registered successfully");
    }
}
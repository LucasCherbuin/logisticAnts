package com.maven.authentification;

import com.maven.service.ClientRegister;
import com.maven.service.JwtService;
import com.maven.model.User;
import com.maven.repository.UserRepository;
import com.maven.model.Role;
import com.maven.repository.RoleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/")
public class AuthController {

    private final UserRepository userRepository;
    private final ClientRegister clientRegister;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          ClientRegister clientRegister,
                          RoleRepository roleRepository,
                          JwtService jwtService,
                          PasswordEncoder passwordEncoder
                        ) {
        this.userRepository = userRepository;
        this.clientRegister = clientRegister;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
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

    @PostMapping("/register-employee")
    public ResponseEntity<?> registerEmployee(@RequestBody RegisterRequest request) {
        if (userRepository.findByPseudo(request.pseudo).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        Role role = roleRepository.findByLabel(request.role)
                .orElseThrow(() -> new RuntimeException("Role not found: " + request.role));

        User user = new User();
        user.setPseudo(request.pseudo);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setRole(role);
        userRepository.save(user);

        return ResponseEntity.ok("Employee registered successfully");
    }

}
package com.maven.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

<<<<<<< HEAD
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 86400000L;
=======
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(
        "logisticants-secret-key-must-be-at-least-32-chars!!".getBytes()
    );

    private static final long EXPIRATION_TIME = 86400000L;
    
>>>>>>> PageClient

    public String generateToken(String pseudo) { 
        return Jwts.builder()
            .setSubject(pseudo)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SECRET_KEY)
            .compact();
    }

    public String extractPseudo(String token) { 
        return Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean validateToken(String token) { 
        try {
            Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
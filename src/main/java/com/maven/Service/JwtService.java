package com.maven.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class JwtService {
    private static final Map<String, String> validTokens = new HashMap<>();
    private static final long EXPIRATION_TIME = 86400000L;

    public static String generateToken(String username) {
        String token = UUID.randomUUID().toString();
        validTokens.put(token, username);
        return token;
    }

    public static String extractUsername(String token) {
        return validTokens.get(token);
    }

    public static boolean validateToken(String token) {
        return validTokens.containsKey(token);
    }
}
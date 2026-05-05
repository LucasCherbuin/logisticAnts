package com.maven.service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class Jwtfilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public Jwtfilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws IOException, ServletException {

        String path = req.getRequestURI();
        System.out.println("FILTER PATH: " + path);

        // Routes publiques — pas de vérification
        if (path.contains("/register") ||
            path.contains("/login") ||
            path.contains("/mail/send")) {
            chain.doFilter(req, res);
            return;
        }

        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtService.validateToken(token)) {
                chain.doFilter(req, res);
                return;
            }
        }

        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
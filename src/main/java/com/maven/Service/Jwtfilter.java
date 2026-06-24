package com.maven.service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

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

        if (path.contains("/register") ||
            path.contains("/login") ||
            path.contains("/mail") ||
            path.contains("/Users") ||
            path.contains("/Produits") ||
            path.contains("/Commandes") ||
            path.contains("/ArticleCommandes") ||
            path.contains("/produitPhare") ||
            path.contains("/prix") ||
            path.contains("/dashboard") ||
            path.contains("/pay")) {
            chain.doFilter(req, res);
            return;
        }

        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtService.validateToken(token)) {
                String pseudo = jwtService.extractPseudo(token);
                var auth = new UsernamePasswordAuthenticationToken(pseudo, null, List.of());
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(auth);
                SecurityContextHolder.setContext(context);
            }
        }
        chain.doFilter(req, res);
    }
}
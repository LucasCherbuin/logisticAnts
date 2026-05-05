package com.maven.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.Customizer;

import com.maven.service.Jwtfilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final Jwtfilter jwtfilter;

    public SecurityConfig(Jwtfilter jwtfilter) {
        this.jwtfilter = jwtfilter;
    }

    @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            System.out.println("✅ SecurityConfig chargée"); // ← ajoutez
            http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/**").permitAll()
                )
                .addFilterBefore(jwtfilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );
            return http.build();
}
}

package com.maven.config;

<<<<<<< HEAD
=======
import org.springframework.beans.factory.annotation.Value;
>>>>>>> PageClient
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
<<<<<<< HEAD

=======
import org.springframework.http.HttpMethod;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import jakarta.servlet.SessionTrackingMode;
import java.util.List;
import java.util.Set;
>>>>>>> PageClient
import com.maven.service.Jwtfilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final Jwtfilter jwtfilter;

<<<<<<< HEAD
=======
    @Value("${frontend.url}")
    private String frontendUrl;

>>>>>>> PageClient
    public SecurityConfig(Jwtfilter jwtfilter) {
        this.jwtfilter = jwtfilter;
    }

    @Bean
<<<<<<< HEAD
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
=======
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(
                    "/Produits/**",
                    "/ArticleCommandes/**",
                    "/Commandes/**",
                    "/Fournisseurs/**",
                    "/dashboard/produitPhare",
                    "/dashboard/prix",
                    "/login",
                    "/mail/**",
                    "/register",
                    "/Users/**",
                    "/pay"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtfilter, UsernamePasswordAuthenticationFilter.class)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(frontendUrl));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomFactoryCustomizer() {
        return factory -> factory.addContextCustomizers(
            context -> context.setUseHttpOnly(true)
        );
    }

    @Bean
    public ServletContextInitializer servletContextInitializer() {
        return servletContext -> servletContext.setSessionTrackingModes(
            Set.of(SessionTrackingMode.COOKIE)
        );
    }
<<<<<<< HEAD
}
>>>>>>> PageClient
=======
}
>>>>>>> PageAdmin

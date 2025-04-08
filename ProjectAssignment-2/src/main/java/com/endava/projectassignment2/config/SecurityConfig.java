package com.endava.projectassignment2.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
    	return new Argon2PasswordEncoder(16, 32, 2, 4096, 4);
    }
    
    @Bean
    CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(List.of("http://localhost:5173")); 
        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH")); 
        corsConfig.setAllowedHeaders(List.of("*"));
        corsConfig.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig); 

        return new CorsWebFilter(source);
    }
}

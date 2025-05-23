package com.filipinoexplorers.capstone.config;

import com.filipinoexplorers.capstone.filter.JwtFilter;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers(HttpMethod.GET, "/api/word-puzzles/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/word-puzzles/**").permitAll()
            .requestMatchers(HttpMethod.PUT, "/api/word-puzzles/**").permitAll()
            .requestMatchers(HttpMethod.DELETE, "/api/word-puzzles/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/translation/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/active-puzzles/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/active-puzzles/**").permitAll()
            .requestMatchers(HttpMethod.PUT, "/api/active-puzzles/**").permitAll()
            .requestMatchers(HttpMethod.DELETE, "/api/active-puzzles/**").permitAll()
            .requestMatchers("/api/teachers/login", 
            "/api/students/login", 
            "/api/teachers/create", 
            "/api/students/create",
            "/api/word-puzzles",
            "/api/word-puzzles/{id}",
            "/api/check-answer",
            "/api/hint/{puzzleId}",
            "/api/teacher-interface",
            "/api/word-puzzles/{id}",
            "/api/active-puzzles/{id}"
            ).permitAll() // Open endpoints
            .anyRequest().authenticated() // Secure all other endpoints
            .and()
            .exceptionHandling()
            .authenticationEntryPoint((request, response, authException) -> {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: " + authException.getMessage());
            })
            .and()
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .cors();  // Enable CORS globally in Spring Security

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}

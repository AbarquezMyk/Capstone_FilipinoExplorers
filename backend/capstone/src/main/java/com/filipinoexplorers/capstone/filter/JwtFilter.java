package com.filipinoexplorers.capstone.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.filipinoexplorers.capstone.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Autowired
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain)
        throws ServletException, IOException {

    String path = request.getRequestURI().toLowerCase(); // force lowercase
    String method = request.getMethod();

    System.out.println("🔍 JwtFilter intercepting: " + method + " " + path);

    if (path.startsWith("/api/parkequest") || method.equalsIgnoreCase("OPTIONS")) {
        System.out.println("✅ Skipping JWT for ParkeQuest public access");
        filterChain.doFilter(request, response);
        return;
    }

    // 🔒 All other endpoints require token
    String authorizationHeader = request.getHeader("Authorization");

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
        String token = authorizationHeader.substring(7);

        // ✅ TEMPORARY BYPASS FOR TESTING
        if ("dummy-token".equals(token)) {
            System.out.println("🔓 Skipping token validation for dummy-token.");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            if (!jwtUtil.validateToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired token");
                return;
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Token validation failed: " + e.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    } else {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Authorization header is missing");
    }
}

}

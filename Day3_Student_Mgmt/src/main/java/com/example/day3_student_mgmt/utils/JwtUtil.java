package com.example.day3_student_mgmt.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

// SPRING BEAN in Springboot
/*
*
* */
@Component
public class JwtUtil {
    private static final String SECRET = "00293afe90fc26c1a051db1c8a6c553f96899c78";

    private final Key key = Keys.hmacShaKeyFor(
            SECRET.getBytes((StandardCharsets.UTF_8))
    );

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String validateTokenAndGetEmail(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject(); // email
        } catch (JwtException | IllegalArgumentException e) {
            // token invalid / expired / tampered
            return null;
        }
    }
}

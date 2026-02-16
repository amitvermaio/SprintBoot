package com.example.todo.controllers;

import com.example.todo.dtos.LoginRequestDto;
import com.example.todo.dtos.RegisterRequestDto;
import com.example.todo.dtos.TokenResponseDto;
import com.example.todo.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public TokenResponseDto login(
            @RequestBody LoginRequestDto dto
    ) {
        return service.login(dto);
    }

    @PostMapping("/register")
    public TokenResponseDto register(
            @Valid @RequestBody RegisterRequestDto dto
    ) {
        return service.register(dto);
    }
}
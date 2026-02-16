package com.example.todo.services;

import com.example.todo.dtos.LoginRequestDto;
import com.example.todo.dtos.RegisterRequestDto;
import com.example.todo.dtos.TokenResponseDto;
import com.example.todo.models.AuthModel;
import com.example.todo.repository.UserRepository;
import com.example.todo.utils.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository repository, JwtUtil jwtUtil) {
        this.repository = repository;
        this.jwtUtil = jwtUtil;
    }

    public TokenResponseDto login(LoginRequestDto dto) {

        AuthModel user = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getId());

        return new TokenResponseDto(token);
    }

    public TokenResponseDto register(RegisterRequestDto dto) {
        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        AuthModel newUser = new AuthModel();
        newUser.setEmail(dto.getEmail());
        newUser.setPassword(dto.getPassword());

        repository.save(newUser);

        String token = jwtUtil.generateToken(newUser.getId());

        return new TokenResponseDto(token);
    }
}

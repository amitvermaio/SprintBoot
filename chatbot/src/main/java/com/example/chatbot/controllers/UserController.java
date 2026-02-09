package com.example.chatbot.controllers;

import com.example.chatbot.dto.UserRequestDto;
import com.example.chatbot.dto.UserResponseDto;
import com.example.chatbot.services.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/users")
    public UserResponseDto chatGemini(UserRequestDto dto) {
        return service.getResponse(dto);
    }
}

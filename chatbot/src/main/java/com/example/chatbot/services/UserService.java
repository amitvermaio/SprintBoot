package com.example.chatbot.services;

import com.example.chatbot.dto.UserRequestDto;
import com.example.chatbot.dto.UserResponseDto;
import com.example.chatbot.models.UserModel;
import com.example.chatbot.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public UserResponseDto getResponse(UserRequestDto userDto) {
        UserModel user = new UserModel();
        user.setRequest(userDto.getRequest());
        String response = "Response";
        user.setResponse(response);
        UserModel saved = repository.save(user);

        return new UserResponseDto(
          saved.getId(),
          saved.getResponse()
        );
    }
}

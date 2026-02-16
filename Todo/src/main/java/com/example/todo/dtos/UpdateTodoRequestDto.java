package com.example.todo.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTodoRequestDto {

    @NotBlank
    private String id;

    private String title;
    private String description;
    private Boolean isDone;
}
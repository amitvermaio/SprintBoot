package com.example.todo.dtos;

public record TodoResponseDto(
        String id,
        String title,
        String description,
        Boolean isDone
) {
}

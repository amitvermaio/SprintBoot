package com.example.todo.services;

import com.example.todo.dtos.TodoRequestDto;
import com.example.todo.dtos.TodoResponseDto;
import com.example.todo.dtos.UpdateTodoRequestDto;
import com.example.todo.models.TodoModel;
import com.example.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<TodoResponseDto> getAllTodos(String userId) {
        return repository.findByUserId(userId)
                .stream()
                .map(todo -> new TodoResponseDto(
                        todo.getId(),
                        todo.getTitle(),
                        todo.getDescription(),
                        todo.getIsDone()
                ))
                .toList();
    }

    public TodoResponseDto createTodo(String userId, TodoRequestDto dto) {

        TodoModel todo = new TodoModel();
        todo.setTitle(dto.getTitle());
        todo.setDescription(dto.getDescription());
        todo.setIsDone(false);
        todo.setUserId(userId);

        TodoModel saved = repository.save(todo);

        return new TodoResponseDto(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getIsDone()
        );
    }

    public TodoResponseDto updateTodo(String userId, UpdateTodoRequestDto dto) {

        TodoModel todo = repository
                .findByIdAndUserId(dto.getId(), userId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        if (dto.getTitle()!=null && !dto.getTitle().isEmpty()) {
            todo.setTitle(dto.getTitle());
        }

        if (dto.getDescription()!=null && !dto.getDescription().isEmpty()) {
            todo.setDescription(dto.getDescription());
        }

        if (dto.getIsDone()!=null) {
            todo.setIsDone(dto.getIsDone());
        }

        TodoModel updated = repository.save(todo);

        return new TodoResponseDto(
                updated.getId(),
                updated.getTitle(),
                updated.getDescription(),
                updated.getIsDone()
        );
    }

    public void deleteTodo(String userId, String todoId) {

        TodoModel todo = repository
                .findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        repository.delete(todo);
    }
}
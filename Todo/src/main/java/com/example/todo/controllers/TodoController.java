package com.example.todo.controllers;

import com.example.todo.dtos.TodoRequestDto;
import com.example.todo.dtos.TodoResponseDto;
import com.example.todo.dtos.UpdateTodoRequestDto;
import com.example.todo.services.TodoService;
import com.example.todo.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/todo")
public class TodoController {
    private final TodoService service;
    private final JwtUtil jwtUtil;

    public TodoController(TodoService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    private String checkToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized! Token not provided!");
        }

        String token = authHeader.substring(7);

        return jwtUtil.validateTokenAndGetId(token);
    }

    @GetMapping("/")
    public List<TodoResponseDto> getAllTodo(
            @RequestHeader(value = "Authorization", required = true) String authHeader
    ) {
        String id = checkToken(authHeader);
        return service.getAllTodos(id);
    }

    @PostMapping("/")
    public TodoResponseDto createTodo(
            @RequestHeader(value = "Authorization", required = true) String authHeader,
            @Valid @RequestBody TodoRequestDto dto
    ) {
        String userId = checkToken(authHeader);
        return service.createTodo(userId, dto);
    }

    @PatchMapping("/update")
    public TodoResponseDto update(
            @RequestHeader(value = "Authorization", required = true) String authHeader,
            @Valid @RequestBody UpdateTodoRequestDto dto
    ) {
        return service.updateTodo(checkToken(authHeader), dto);
    }

    @DeleteMapping("/{id}")
    public String delete(
            @RequestHeader(value = "Authorization", required = true) String authHeader,
            @PathVariable String id
    ) {
        String token = checkToken(authHeader);
        service.deleteTodo(token, id);
        return "Todo deleted successfully";
    }
}

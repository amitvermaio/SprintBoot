package com.example.todo.repository;

import com.example.todo.models.TodoModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository<TodoModel, String> {
    List<TodoModel> findByUserId(String userId);
    Optional<TodoModel> findByIdAndUserId(String id, String userId);
}

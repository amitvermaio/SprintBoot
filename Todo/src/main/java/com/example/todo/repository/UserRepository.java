package com.example.todo.repository;

import com.example.todo.models.AuthModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<AuthModel, String> {
    Optional<AuthModel> findByEmail(String email);
}

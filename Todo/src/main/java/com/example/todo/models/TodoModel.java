package com.example.todo.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "todo")
public class TodoModel {

    @Id
    private String id;
    private String title;
    private String description;
    private Boolean isDone;
    private String userId;
}

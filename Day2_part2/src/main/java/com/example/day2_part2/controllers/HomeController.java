package com.example.day2_part2.controllers;

import com.example.day2_part2.models.StudentModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/student")
    public StudentModel getStudent() {
        StudentModel student = new StudentModel(1, "Amit", "amit@email.com");
        return student;
    }
}

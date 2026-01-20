package com.example.day3_student_mgmt.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    @GetMapping("/")
    public String home() {
        return "<center><h1>Welcome to home page!</h1></center>";
    }
}

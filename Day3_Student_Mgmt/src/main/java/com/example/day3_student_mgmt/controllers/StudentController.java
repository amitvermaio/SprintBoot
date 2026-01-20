package com.example.day3_student_mgmt.controllers;

import com.example.day3_student_mgmt.models.StudentModel;
import com.example.day3_student_mgmt.services.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    private final StudentService service;

    public  StudentController(StudentService service) {
        this.service = service;
    }

    // Create function API
    @PostMapping("/students/add")
    public StudentModel addStudent(@RequestBody StudentModel studentModel) {
        return service.addStudent(studentModel);
    }

}

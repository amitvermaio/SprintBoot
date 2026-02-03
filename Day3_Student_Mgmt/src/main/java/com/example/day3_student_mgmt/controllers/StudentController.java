package com.example.day3_student_mgmt.controllers;

import com.example.day3_student_mgmt.models.StudentModel;
import com.example.day3_student_mgmt.services.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class StudentController {

    private final StudentService service;

    public  StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping("/students")
    public List<StudentModel> getStudent(@RequestParam String id) {
        if (!id.isEmpty() && id!=null) {
            return Collections.singletonList(service.getStudentById(id));
        }
        return service.getStudent();
    }

    @PostMapping("/students/add")
    public StudentModel addStudent(@RequestBody StudentModel studentModel) {
        return service.addStudent(studentModel);
    }
}

package com.example.day3_student_mgmt.services;

import com.example.day3_student_mgmt.models.StudentModel;
import com.example.day3_student_mgmt.repository.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    // Create
    public StudentModel addStudent(StudentModel student) {
        return repository.save(student);
    }
}

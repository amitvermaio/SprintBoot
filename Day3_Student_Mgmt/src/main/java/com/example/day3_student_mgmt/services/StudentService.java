package com.example.day3_student_mgmt.services;

import com.example.day3_student_mgmt.dto.StudentRequestDto;
import com.example.day3_student_mgmt.dto.StudentResponseDto;
import com.example.day3_student_mgmt.models.StudentModel;
import com.example.day3_student_mgmt.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public StudentModel getStudentById(String id) {
        return repository.findById(id)
                .orElse(null);
    }

    public List<StudentModel> getStudent() {
        return repository.findAll();
    }

    // Create
//    public StudentModel addStudent(StudentModel student) {
//        return repository.save(student);
//    }

    public StudentResponseDto addStudent(StudentRequestDto dto) {
        // This is Object is for server to create Instance
        StudentModel student = new StudentModel();
        student.setName(dto.getName());
        student.setAge(dto.getAge());
        student.setEmail(dto.getEmail());

        StudentModel saved = repository.save(student);

        // This is for Client to send in this Id also comes and it is created user from DB.
        return new StudentResponseDto(
                saved.getId(),
                saved.getName(),
                saved.getAge(),
                saved.getEmail()
        );
    }
}

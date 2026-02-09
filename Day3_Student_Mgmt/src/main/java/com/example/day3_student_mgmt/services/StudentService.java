package com.example.day3_student_mgmt.services;

import com.example.day3_student_mgmt.dto.StudentRequestDto;
import com.example.day3_student_mgmt.dto.StudentResponseDto;
import com.example.day3_student_mgmt.exception.StudentNotFoundException;
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

    public List<StudentResponseDto> getAllStudents() {
        return repository.findAll()
                .stream()
                .map(s -> new StudentResponseDto(
                        s.getId(),
                        s.getName(),
                        s.getAge(),
                        s.getEmail()
                )).toList();
    }

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

    public StudentResponseDto updateStudent(String id, StudentRequestDto dto) {
        StudentModel student = repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found!"));

        if (dto.getName().isBlank() && dto.getName()!=null)
            student.setName(dto.getName());

        if (dto.getAge()!=0 && dto.getAge()!=null)
            student.setAge(dto.getAge());

        if (dto.getEmail().equals("") && dto.getEmail()!=null)
            student.setEmail(dto.getEmail());

        repository.save(student);

        return new StudentResponseDto(
                student.getId(),
                student.getName(),
                student.getAge(),
                student.getEmail()
        );
    }

    public String deleteStudent(String id) {
        StudentModel student = repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found"));
        repository.deleteById(id);
        return "Student Deleted Successfully";
    }
}

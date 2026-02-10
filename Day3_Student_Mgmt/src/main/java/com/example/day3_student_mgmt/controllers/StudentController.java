package com.example.day3_student_mgmt.controllers;

import com.example.day3_student_mgmt.dto.StudentRequestDto;
import com.example.day3_student_mgmt.dto.StudentResponseDto;
import com.example.day3_student_mgmt.services.StudentService;
import com.example.day3_student_mgmt.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class StudentController {

    private final StudentService service;
    private final JwtUtil jwtUtil;

    public StudentController(StudentService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    private void checkToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized! Token not provided!");
        }

        String token = authHeader.substring(7);

        jwtUtil.validateTokenAndGetEmail(token);
    }

    @GetMapping("/students")
    public List<StudentResponseDto> getAllStudents(
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        checkToken(authHeader);
        return service.getAllStudents();
    }

    @PostMapping("/students")
    public StudentResponseDto addStudent(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody StudentRequestDto student
    ) {
        checkToken(authHeader);
        return service.addStudent(student);
    }

    @PatchMapping("/students/{studentId}")
    public StudentResponseDto updateStudent(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String studentId,
            @RequestBody StudentRequestDto updates
    ) {
        checkToken(authHeader);
        return service.updateStudent(studentId, updates);
    }

    @DeleteMapping("/students/{studentId}")
    public String deleteStudent(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String studentId
    ) {
        checkToken(authHeader);
        return service.deleteStudent(studentId);
    }
}
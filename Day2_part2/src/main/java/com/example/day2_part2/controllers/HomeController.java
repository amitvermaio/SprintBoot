package com.example.day2_part2.controllers;

import com.example.day2_part2.models.StudentModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
@RestController
public class HomeController {

    private final ArrayList<StudentModel> students;

    public HomeController() {
        students = new ArrayList<>();
        students.add(new StudentModel(1, "Amit", "amit@email.com"));
        students.add(new StudentModel(2, "Ayush", "ayush@email.com"));
        students.add(new StudentModel(3, "Rohan", "rohan@email.com"));
        students.add(new StudentModel(4, "Ram", "ram@email.com"));
        students.add(new StudentModel(5, "React", "react@email.com"));
    }

    @GetMapping("/student")
    public ArrayList<StudentModel> getStudent() {
        return students;
    }

    @GetMapping("/student/{studentId}")
    public StudentModel studentById(@PathVariable int studentId) {
        for (StudentModel student : students) {
            if (student.getId() == studentId) {
                return student;
            }
        }
        return null;
    }
}

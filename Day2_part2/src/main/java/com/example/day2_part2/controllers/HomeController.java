package com.example.day2_part2.controllers;

import com.example.day2_part2.models.StudentModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class HomeController {

    @GetMapping("/student")
    public ArrayList<StudentModel> getStudent() {
        ArrayList<StudentModel> students = new ArrayList<>();
        StudentModel student1 = new StudentModel(1, "Amit", "amit@email.com");
        StudentModel student2 = new StudentModel(2, "Ayush", "ayush@email.com");
        StudentModel student3 = new StudentModel(3, "Rohan", "rohan@email.com");
        StudentModel student4 = new StudentModel(4, "Ram", "ram@email.com");
        StudentModel student5 = new StudentModel(5, "React", "react@email.com");
        students.add(student1);
        students.add(student2);
        students.add(student3);
        students.add(student4);
        students.add(student5);
        return students;
    }
}

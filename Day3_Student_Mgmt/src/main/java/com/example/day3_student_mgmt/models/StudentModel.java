package com.example.day3_student_mgmt.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // It will automatically create all the 2**(no. of vars)
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="students")
public class StudentModel {

    @Id
    private String id;
    private String name;
    private String age;
    private String email;

}

package com.example.day3_student_mgmt.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Data // It will automatically create all the 2**(no. of vars) It will return all the methods such as toString() toHashCode() mehtod saare bana deta hai
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="students")
//
public class StudentModel {

    @Id
    private String id;
    private String name;
    private Integer age;
    private String email;

}

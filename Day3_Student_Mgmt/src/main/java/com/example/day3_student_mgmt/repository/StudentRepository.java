package com.example.day3_student_mgmt.repository;

import com.example.day3_student_mgmt.models.StudentModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository <StudentModel, String> {
    // <, String(ID String)>
}



package com.example.day3_student_mgmt.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// Request Lena and validate karna
public class StudentRequestDto {
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Min(value = 5, message = "Age cannot be less than 5")
    @Max(value = 90, message = "Age cannot be greater than 90")
    private Integer age;

    @Email(message = "Email should be Valid")
    @NotBlank(message = "Email cannot be blank")
    private String email;
}
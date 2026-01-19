package com.example.day2_part2.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    @GetMapping("/about")
    public String about() {
        return "This is About Page of Springboot Application!";
    }

    @GetMapping("/contact")
    public String contact() {
        return "This is Contact Page of Springboot Application!";
    }
}

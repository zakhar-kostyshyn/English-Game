package com.game.student;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StudentApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentApplication.class, args);
    }

    @Value("${student.test}")
    private String testConfig;

    @GetMapping(value = "/testConfig")
    public String testConfigServer() {
        return "Hello with value from config server : " + testConfig;
    }
}

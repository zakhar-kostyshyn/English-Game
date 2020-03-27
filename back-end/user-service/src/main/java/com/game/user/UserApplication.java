package com.game.user;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class UserApplication {

	@Value("${user.test}")
	private String testConfig;

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}

	@GetMapping(value = "/testConfig")
	public String testConfigServer() {
		return "Hello with value from config server : " + testConfig;
	}


}

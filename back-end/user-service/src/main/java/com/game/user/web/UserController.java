package com.game.user.web;

import com.game.user.DAO.CreateUser;
import com.game.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //  get user by username
    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUser(@Valid  @PathVariable String username) {
        return ResponseEntity.ok(userService.getByUsername(username));
    }

    //  create new user with using input date
    @GetMapping("/user/create")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUser newUser) {
        return ResponseEntity.ok(userService.createUser(newUser));
    }
}

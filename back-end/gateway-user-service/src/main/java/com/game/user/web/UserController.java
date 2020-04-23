package com.game.user.web;

import com.game.user.DAO.CreateUser;
import com.game.user.DAO.LoginUser;
import com.game.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    //  get user by username
    @GetMapping("/{username}")
    public ResponseEntity<?> getUser(@Valid  @PathVariable String username) {
        log.info("/user/{" + username + "} run");
        return ResponseEntity.ok(userService.getByUsername(username));
    }

    //  create new user with using input date
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUser newUser) {
        log.info("/user/create with posted " + newUser + " run");
        return ResponseEntity.ok(userService.createUser(newUser));
    }

    //  test
    @GetMapping("/test")
    public ResponseEntity<?> testUser() {
        log.info("test");
        return ResponseEntity.ok("TEST");
    }


    //  authentificate user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginUser login) {
        log.info("/user/create with posted " + login + " run");
        return ResponseEntity.ok(userService.loginUser(login));
    }
}

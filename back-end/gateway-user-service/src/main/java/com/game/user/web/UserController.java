package com.game.user.web;

import com.game.user.payload.CreateUser;
import com.game.user.payload.LoginUser;
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

    //  load user. Check token and if it valid get username and return data about user
    @PostMapping("/load")
    public ResponseEntity<?> loadUser (@Valid @RequestHeader("Authorization") String tokenHeader) {
        log.info("/user/load with posted " + tokenHeader + " run");
        return ResponseEntity.ok(userService.loadUser(tokenHeader));
    }

    //  authentificate user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginUser login) {
        log.info("/user/login with posted " + login + " run");
        return ResponseEntity.ok(userService.loginUser(login));
    }
}

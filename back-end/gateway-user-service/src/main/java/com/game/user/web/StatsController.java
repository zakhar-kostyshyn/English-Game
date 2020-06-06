package com.game.user.web;

import com.game.user.payload.StatsAdd;
import com.game.user.service.StatsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/user/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    //  add stats to user
    @PostMapping("/post")
    public ResponseEntity<?> addStats(@Valid  @RequestBody StatsAdd statsAdd) {
        log.info("/user/stats/post/{" + statsAdd + "} run");
        return ResponseEntity.ok(statsService.addStats(statsAdd));
    }

    //  add stats to user
    @GetMapping("/get/{username}")
    public ResponseEntity<?> getStats(@Valid @PathVariable String username) {
        log.info("/user/stats/get/{" + username + "} run");
        return ResponseEntity.ok(statsService.getStats(username));
    }

}

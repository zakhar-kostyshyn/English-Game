package com.game.game.web;

import com.game.game.DAO.CreateNewUserScore;
import com.game.game.ImageServiceRunner;
import com.game.game.service.GameService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/game")
public class GameController {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(GameController.class);

    @Autowired
    private GameService gameService;

    //  get all game's score by game name
    @GetMapping("/score/{name}")
    public ResponseEntity<?> getScore(@Valid @PathVariable String name) {
        log.info("/game/score{" + name + "} run");
        return ResponseEntity.ok(gameService.getGameScore(name));
    }

    @GetMapping("/text/{name}")
    public ResponseEntity<?> test(@Valid @PathVariable String name) {
        log.info("/game/text{" + name + "} run");
        return ResponseEntity.ok(gameService.getGameDescription(name));
    }

    //  add new user's score to score set
    @PostMapping(value = "/score")
    public ResponseEntity<?> addNewScore(@Valid @RequestBody CreateNewUserScore createNewUserScore) {
        log.info("/game/ with posted " + createNewUserScore + " run");
        return ResponseEntity.ok(gameService.createScore(createNewUserScore));
    }

}

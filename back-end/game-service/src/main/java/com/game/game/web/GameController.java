package com.game.game.web;

import com.game.game.DAO.CreateNewUserScore;
import com.game.game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    //  get all game's score by game name
    @GetMapping("/game/{name}")
    public ResponseEntity<?> getScore(@Valid @PathVariable String name) {
        return ResponseEntity.ok(gameService.getGameScore(name));
    }

    //  add new user's score to score set
    @PostMapping("/game/")
    public ResponseEntity<?> addNewScore(@Valid @RequestBody CreateNewUserScore createNewUserScore) {
        return ResponseEntity.ok(gameService.createScore(createNewUserScore));
    }

}

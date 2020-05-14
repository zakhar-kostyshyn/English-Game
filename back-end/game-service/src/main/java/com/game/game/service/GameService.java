package com.game.game.service;

import com.game.game.DAO.CreateNewUserScore;
import com.game.game.model.Game;
import com.game.game.model.Score;
import com.game.game.repository.GameRepository;
import com.game.game.repository.ScoreRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Set;
import java.util.stream.Collectors;

import static java.lang.Integer.decode;

@Service
@Slf4j
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    //  get all game's score by game name
    public Set<Score> getGameScore(String name) {

        Set<Score> scores = gameRepository.findByName(name.toLowerCase())
                .orElseThrow(() -> new RuntimeException("table " + name + " is not exist"))
                .getScore();

        log.info("all Score : " + scores + " in Game : " + name);

        return scores;
    }

    //  add new user's score to score set
    public Integer createScore(CreateNewUserScore createNewUserScore) {

        Score newScore = Score.builder()
                .score(createNewUserScore.getScore())
                .username(createNewUserScore.getUsername())
                .scoreTime(createNewUserScore.getScoreTime())
                .build();

        scoreRepository.save(newScore);

        // TODO chek if game with input name  exist
        Game existedGame = gameRepository.findByName(createNewUserScore.getGame()).orElseThrow();

        Set<Score> addedSet = existedGame.getScore();
        addedSet.add(newScore);

        gameRepository.save(existedGame);

        log.info("new Score : " + newScore + " in Game : " + existedGame);
        log.info("all Score : " + addedSet + " in Game : " + createNewUserScore.getGame());

        //  get index of our new score by score number
        Integer index = new ArrayList<Score>(addedSet).stream()
                .sorted((s1, s2) -> Integer.decode(s2.getScore()).compareTo(Integer.decode(s1.getScore())))
                .collect(Collectors.toList())
                .indexOf(newScore);

        log.info("index of created score is : " + index);

        return index;
    }

    public String getGameDescription(String name) {

        String description = gameRepository.findByName(name.toLowerCase())
                .orElseThrow(() -> new RuntimeException("table " + name + " is not exist"))
                .getDescription();

        log.info("all Score : " + description + " in Game : " + name);

        return description;

    }

}

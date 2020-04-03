package com.game.game.service;

import com.game.game.DAO.CreateNewUserScore;
import com.game.game.model.Game;
import com.game.game.model.Score;
import com.game.game.repository.GameRepository;
import com.game.game.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    //  get all game's score by game name
    public Set<Score> getGameScore(String name) {

        // TODO check if user with input game name exist
        Set<Score> scores = gameRepository.findByName(name).get().getScore();

        return scores;
    }

    //  add new user's score to score set
    public Set<Score> createScore(CreateNewUserScore createNewUserScore) {

        Score newScore = Score.builder()
                .score(createNewUserScore.getScore())
                .username(createNewUserScore.getUsername())
                .build();

        scoreRepository.save(newScore);

        // TODO chek if game with input name  exist
        Game existedGame = gameRepository.findByName(createNewUserScore.getGame()).get();

        Set<Score> addedSet = existedGame.getScore();
        addedSet.add(newScore);

        gameRepository.save(existedGame);

        return addedSet;
    }

}

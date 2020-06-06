package com.game.user.service;

import com.game.user.model.Stats;
import com.game.user.model.User;
import com.game.user.payload.StatsAdd;
import com.game.user.payload.StatsResponse;
import com.game.user.repository.StatsRepository;
import com.game.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static java.lang.Long.parseLong;

@Service
@Slf4j
public class StatsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StatsRepository statsRepository;


    //  add stats to user
    public StatsResponse addStats(StatsAdd statsAdd) {

        User existUser = userRepository.findByUsername(statsAdd.getUsername())
                .orElseThrow(() -> new RuntimeException("no user with given username"));

        Stats waitForUpdateStats = existUser.getStats();

        log.info("Before Update Stats : " + waitForUpdateStats);

        //  add score
        waitForUpdateStats.setUserScore(waitForUpdateStats.getUserScore() + parseLong(statsAdd.getScore()));

        //  add time
        waitForUpdateStats.setUserTime(waitForUpdateStats.getUserTime() + parseLong(statsAdd.getTime()));

        //  increase by one games
        waitForUpdateStats.setUserGames(waitForUpdateStats.getUserGames() + 1L);

        statsRepository.save(waitForUpdateStats);

        log.info("Update Stats : " + waitForUpdateStats);

        return StatsResponse.builder()
                .gameCounter(waitForUpdateStats.getUserGames())
                .score(waitForUpdateStats.getUserScore())
                .time(waitForUpdateStats.getUserTime())
                .build();
    }

    //  get stats from user
    public StatsResponse getStats(String username) {

        User existUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("no user with given username"));

        Stats existStats = existUser.getStats();

        log.info("Return stats : " + existStats);

        return StatsResponse.builder()
                .gameCounter(existStats.getUserGames())
                .score(existStats.getUserScore())
                .time(existStats.getUserTime())
                .build();
    }


}

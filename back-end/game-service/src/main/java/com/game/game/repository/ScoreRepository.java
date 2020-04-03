package com.game.game.repository;

import com.game.game.model.Score;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends CrudRepository<Score, Long> {



}

package com.game.game.repository;

import com.game.game.model.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {

    Optional<Game> findByName(String name);

}

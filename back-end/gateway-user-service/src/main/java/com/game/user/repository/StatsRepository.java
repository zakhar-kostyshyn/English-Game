package com.game.user.repository;

import com.game.user.model.Stats;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface StatsRepository extends CrudRepository<Stats, Long> {
}

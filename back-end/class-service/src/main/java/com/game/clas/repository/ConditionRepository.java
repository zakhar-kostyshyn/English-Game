package com.game.clas.repository;

import com.game.clas.model.Condition;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConditionRepository extends CrudRepository<Condition, Long> {
}

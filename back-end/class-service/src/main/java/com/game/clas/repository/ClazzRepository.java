package com.game.clas.repository;

import com.game.clas.model.Clazz;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ClazzRepository extends CrudRepository<Clazz, Long> {

    Set<Clazz> findAllByOwner (String owner);

}

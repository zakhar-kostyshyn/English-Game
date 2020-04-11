package com.game.game.repository;

import com.game.game.model.Image;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ImageRepository extends CrudRepository<Image, Long> {

    Optional<List<Image>> findAllByTheme (String theme);
    Optional<Image> findByName (String name);
    Boolean existsByName (String name);
}

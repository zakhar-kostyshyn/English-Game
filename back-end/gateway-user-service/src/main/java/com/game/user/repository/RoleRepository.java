package com.game.user.repository;

import com.game.user.model.ERoles;
import com.game.user.model.Role;
import com.game.user.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByName(ERoles name);

}

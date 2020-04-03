package com.game.user.service;

import com.game.user.DAO.CreateUser;
import com.game.user.model.ERoles;
import com.game.user.model.Role;
import com.game.user.model.User;
import com.game.user.repository.RoleRepository;
import com.game.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.TreeSet;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    //  get user by username
    public User getByUsername (String username) {

        // TODO chek if user with seted username exist

        User findedUser = userRepository.findByUsername(username).get();
        return findedUser;
    }

    //  create new user with using input date
    public User createUser(CreateUser newUser) {

        // TODO chek if user with seted username exist

        Set<String> roles = newUser.getRole();
        Set<Role> newRole = new TreeSet<>();

        for (String role : roles) {
            switch (role) {
                case "user":
                    Role userRole = roleRepository.findByName(ERoles.ROLE_USER).get();
                    newRole.add(userRole);
                case "admin":
                    Role adminRole = roleRepository.findByName(ERoles.ROLE_ADMIN).get();
                    newRole.add(adminRole);
                case "student":
                    Role studentRole = roleRepository.findByName(ERoles.ROLE_STUDENT).get();
                    newRole.add(studentRole);
                case "teacher":
                    Role teacherRole = roleRepository.findByName(ERoles.ROLE_TEACHER).get();
                    newRole.add(teacherRole);
            }
        }

        User createdUser = User.builder()
                .email(newUser.getEmail())
                .name(newUser.getName())
                .password(newUser.getPassword())
                .surname(newUser.getSurname())
                .username(newUser.getUsername())
                .build();

        userRepository.save(createdUser);

        return  createdUser;
    }
}

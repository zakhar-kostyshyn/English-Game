package com.game.user.service;

import com.game.user.DAO.CreateUser;
import com.game.user.DAO.JwtResponse;
import com.game.user.DAO.LoginUser;
import com.game.user.model.ERoles;
import com.game.user.model.Role;
import com.game.user.model.User;
import com.game.user.repository.RoleRepository;
import com.game.user.repository.UserRepository;
import com.game.user.security.JwtTokenService;
import com.game.user.security.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtTokenService jwtTokenService;

    //  get user by username
    public User getByUsername (String username) {

        // TODO chek if user with seted username exist

        User findedUser = userRepository.findByUsername(username).get();

        log.info("find User by username : " + username + " is : " + findedUser);

        return findedUser;
    }

    //  create new user with using input date
    public User createUser(CreateUser newUser) {

        // TODO chek if user with seted username exist

        Set<String> roles = newUser.getRole();
        Set<Role> newRole = new HashSet<>();

        for (String role : roles) {
            switch (role) {
                case "user":
                    Role userRole = roleRepository.findByName(ERoles.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Role is not found"));
                    newRole.add(userRole);
                    break;
                case "admin":
                    Role adminRole = roleRepository.findByName(ERoles.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Role is not found"));
                    newRole.add(adminRole);
                    break;
                case "student":
                    Role studentRole = roleRepository.findByName(ERoles.ROLE_STUDENT)
                            .orElseThrow(() -> new RuntimeException("Role is not found"));
                    newRole.add(studentRole);
                    break;
                case "teacher":
                    Role teacherRole = roleRepository.findByName(ERoles.ROLE_TEACHER)
                            .orElseThrow(() -> new RuntimeException("Role is not found"));
                    newRole.add(teacherRole);
                    break;
                default:
                    break;
            }
        }

        User createdUser = User.builder()
                .roles(newRole)
                .email(newUser.getEmail())
                .name(newUser.getName())
                .password(newUser.getPassword())
                .surname(newUser.getSurname())
                .username(newUser.getUsername())
                .build();

        userRepository.save(createdUser);

        log.info("new User : " + createdUser);

        return  createdUser;
    }

    //  authentificate user
    public JwtResponse loginUser(LoginUser loginUser) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser.getLogin(), loginUser.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenService.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> authorities = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return JwtResponse.builder()
                .token(token)
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .email(userDetails.getEmail())
                .roles(authorities)
                .build();
    }
}

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
import com.game.user.security.UserDetailsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

import static com.game.user.security.SecurityConstants.AUTHORIZATION;
import static com.game.user.security.SecurityConstants.BEARER;

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

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;


    //  get user by username
    public User getByUsername (String username) {

        // TODO chek if user with seted username exist

        User findedUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(username + " found"));

        log.info("find User by username : " + username + " is : " + findedUser);

        return findedUser;
    }

    //  create new user with using input date
    public User createUser(CreateUser newUser) {

        // TODO chek if user with seted username exist

        Set<String> roles = newUser.getRole();
        Set<Role> newRole = new HashSet<>();

        //  iterate through string of roles to create Set<Role>
        if (roles != null) {
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
        } else {
            //  if there is empty string set roles (default User)
            Role userRole = roleRepository.findByName(ERoles.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role is not found"));
            newRole.add(userRole);
        }


        User createdUser = User.builder()
                .roles(newRole)
                .email(newUser.getEmail())
                .name(newUser.getName())
                .password(bCryptPasswordEncoder.encode(newUser.getPassword()))
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

    //  load user. Check token and if it valid get username and return data about user
    public JwtResponse loadUser(String tokenHeader) {

        final String token = getToken(tokenHeader)
                .orElseThrow(() -> new RuntimeException(tokenHeader + "doesn't contain token"));

        if (!jwtTokenService.validateToken(token)) {
            log.info("token " + token + " is invalid");
            return null;
        }

        String username = jwtTokenService.getUsernameFromToken(token);

        UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);

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

    //  get token from header
    private static Optional<String> getToken(String headerToken) {
        if (StringUtils.hasText(headerToken) && headerToken.startsWith(BEARER.value))
            return Optional.of(headerToken.substring(7));
        return Optional.empty();
    }
}

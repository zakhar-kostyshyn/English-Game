package com.game.user.security;

import com.game.user.model.User;
import com.game.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = null;
        try {
             user = userRepository.findByUsername(username).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("no username");
        }
        assert user != null;
        return UserDetailsImpl.build(user);
    }
}

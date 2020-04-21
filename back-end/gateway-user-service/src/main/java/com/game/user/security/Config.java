package com.game.user.security;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class Config extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        super.configure(auth);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().and().cors().disable()
                .authorizeRequests(auth -> auth
                    .mvcMatchers("/game-service/").permitAll()
                    .mvcMatchers("/game-service/chat/create").hasAnyRole("TEACHER", "USER", "STUDENT")
                    .mvcMatchers("/class-service/").hasAnyRole("TEACHER", "STUDENT")
                );
    }
}

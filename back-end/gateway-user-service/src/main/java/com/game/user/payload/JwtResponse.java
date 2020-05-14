package com.game.user.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class JwtResponse {

    private final String token;
    private final String type = "Bearer";
    private final Long id;
    private final String username;
    private final String surname;
    private final String name;
    private final String email;
    private final List<String> roles;

}

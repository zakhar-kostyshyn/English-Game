package com.game.user.payload;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class LoginUser {

    @NotBlank(message = "Field 'login' must be filled")
    private String login;

    @NotBlank(message = "Field 'password' must be filled")
    private String password;

}

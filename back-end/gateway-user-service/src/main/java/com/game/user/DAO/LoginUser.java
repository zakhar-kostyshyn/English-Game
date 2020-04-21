package com.game.user.DAO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@ToString
public class LoginUser {

    @NotBlank(message = "Field 'login' must be filled")
    private String login;

    @NotBlank(message = "Field 'password' must be filled")
    private String password;

    @NotBlank(message = "Field 'roles' must be filled")
    private List<String> roles;

}

package com.game.user.payload;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;


@Getter
@Setter
@ToString
public class CreateUser {

    @NotBlank(message = "Field 'name' must be filled")
    private String name;

    @NotBlank(message = "Field 'surname' must be filled")
    @Size(max = 40)
    private String surname;

    @NotBlank(message = "Field 'username' must be filled")
    @Size(max = 10)
    private String username;

    @NotBlank(message = "Field 'password' must be filled")
    @Size(max = 40)
    private String password;

    @Email(message = "This is not email, please enter correct data")
    @NotBlank(message = "Field 'email' must be filled")
    @Size(max = 20)
    private String email;

    private Set<String> role;
}

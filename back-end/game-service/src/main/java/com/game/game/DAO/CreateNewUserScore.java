package com.game.game.DAO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CreateNewUserScore {

    @NotBlank(message = "Field 'game' must be filled")
    private String game;

    @NotBlank(message = "Field 'username' must be filled")
    private String username;

    @NotBlank(message = "Field 'score' must be filled")
    private String score;

    @NotBlank(message = "Field 'scoreTime' must be filled")
    private String scoreTime;
}

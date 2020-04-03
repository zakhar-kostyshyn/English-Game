package com.game.game.DAO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CreateNewReply {

    @NotBlank(message = "Field 'message' must be filled")
    private String message;

    @NotBlank(message = "Field 'username' must be filled")
    private String username;

    @NotBlank(message = "Field 'date' must be filled")
    private String date;

    @NotBlank(message = "Field 'parent' must be filled")
    private String parent;

    @NotBlank(message = "Field 'game' must be filled")
    private String game;
}

package com.game.clas.DAO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CreateNewTask {

    @NotBlank(message = "Field 'name' must be filled")
    private String name;

    @NotBlank(message = "Field 'game' must be filled")
    private String game;

    private String end_date;

}
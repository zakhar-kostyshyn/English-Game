package com.game.clas.DAO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CreateNewCondition {

    @NotBlank(message = "Field 'name' must be filled")
    private String name;

    @NotBlank(message = "Field 'condition' must be filled")
    private String condition;

    @NotBlank(message = "Field 'task' must be filled")
    private String task;

}

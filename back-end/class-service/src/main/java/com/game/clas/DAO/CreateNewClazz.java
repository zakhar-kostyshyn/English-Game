package com.game.clas.DAO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CreateNewClazz {

    @NotBlank(message = "Field 'name' must be filled")
    private String name;

    @NotBlank(message = "Field 'owner' must be filled")
    private String owner;

}

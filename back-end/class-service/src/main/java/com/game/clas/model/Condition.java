package com.game.clas.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "condition_table")
public class Condition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @NotBlank(message = "Field 'name' must be filled")
    private String name;

    @NotBlank(message = "Field 'cond' must be filled")
    private String cond;

}

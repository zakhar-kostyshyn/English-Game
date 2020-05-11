package com.game.game.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "scores_table")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @NotBlank(message = "Field 'username' must be filled")
    @Size(max = 20)
    private String username;

    @NotBlank(message = "Field 'score' must be filled")
    @Size(max = 40)
    private String score;

    @NotBlank(message = "Field 'scoreTime' must be filled")
    @Size(max = 100)
    private String scoreTime;
}

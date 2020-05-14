package com.game.game.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "games_table", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @NotBlank(message = "Field 'name' must be filled")
    @Size(max = 50)
    private String name;

    @NotBlank(message = "Field 'description' must be filled")
    @Size(max = 500)
    private String description;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "games_score_table",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "score_id"))
    private Set<Score> score = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    private Chat chat;

}

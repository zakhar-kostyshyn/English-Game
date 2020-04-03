package com.game.clas.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;
import java.util.TreeSet;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "tasks_table")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @NotBlank(message = "Field 'name' must be filled")
    private String name;

    @NotBlank(message = "Field 'game' must be filled")
    private String game;

    private String end_date;

    private String status;

    @OneToMany
    @JoinTable(name = "task_condition_table",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "condition_id"))
    private Set<Condition> condition = new TreeSet<>();
}

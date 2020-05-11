package com.game.game.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Builder
@Table(name = "messages_table")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @NotBlank(message = "Field 'username' must be filled")
    private String username;

    @NotBlank(message = "Field 'message' must be filled")
    private String message;

    @NotBlank(message = "Field 'date' must be filled")
    private String date;

}

package com.game.game.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_reply_id")
    private Message parent;

    @OneToMany(mappedBy = "parent")
    private Set<Message> replies = new TreeSet<>();
}

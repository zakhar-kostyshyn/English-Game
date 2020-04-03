package com.game.game.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "chats_table")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "chat_message_table",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "message_id"))
    private List<Message> data = new LinkedList<>();

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "chat")
    private Game game;

}

package com.game.game.web;

import com.game.game.DAO.CreateNewMessage;
import com.game.game.DAO.CreateNewReply;
import com.game.game.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;

    //  get all message from game's chat by game's name
    @GetMapping("/chat/{name}")
    public ResponseEntity<?> getChat(@Valid @PathVariable String name) {
        return ResponseEntity.ok(chatService.getAllMessage(name));
    }

    //  create new message in input game
    @PostMapping("/chat/create")
    public ResponseEntity<?> createNewMessage(@Valid @RequestBody CreateNewMessage createNewMessage) {
        return ResponseEntity.ok(chatService.createMessage(createNewMessage));
    }

    //  create new reply in input game and parent message
    @PostMapping("/chat/create/reply")
    public ResponseEntity<?> createNewReply(@Valid @RequestBody CreateNewReply createNewReply) {
        return ResponseEntity.ok(chatService.createReply(createNewReply));
    }

    //  get all replies from message
    @GetMapping("/chat/{messageId}")
    public ResponseEntity<?> getAllReplies(@Valid @PathVariable String messageId) {
        return ResponseEntity.ok(chatService.getReplies(messageId));
    }

}

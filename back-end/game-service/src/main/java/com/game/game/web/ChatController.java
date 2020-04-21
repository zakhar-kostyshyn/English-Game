package com.game.game.web;

import com.game.game.DAO.CreateNewMessage;
import com.game.game.DAO.CreateNewReply;
import com.game.game.ImageServiceRunner;
import com.game.game.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
public class ChatController {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private ChatService chatService;

    //  get all message from game's chat by game's name
    @GetMapping("/chat/{name}")
    public ResponseEntity<?> getChat(@Valid @PathVariable String name) {
        log.info("/chat/{" + name + "} run");
        return ResponseEntity.ok(chatService.getAllMessage(name));
    }

    //  create new message in input game
    @PostMapping("/chat/create")
    public ResponseEntity<?> createNewMessage(@Valid @RequestBody CreateNewMessage createNewMessage) {
        log.info("/chat/create with posted " + createNewMessage + " run");
        return ResponseEntity.ok(chatService.createMessage(createNewMessage));
    }

    //  create new reply in input game and parent message
    @PostMapping("/chat/create/reply")
    public ResponseEntity<?> createNewReply(@Valid @RequestBody CreateNewReply createNewReply) {
        log.info("/chat/create/reply with posted " + createNewReply + " run");
        return ResponseEntity.ok(chatService.createReply(createNewReply));
    }

    //  get all replies from message
    @GetMapping("/chat/replies/{messageId}")
    public ResponseEntity<?> getAllReplies(@Valid @PathVariable String messageId) {
        log.info("/chat/{" + messageId + "} run");
        return ResponseEntity.ok(chatService.getReplies(messageId));
    }

}

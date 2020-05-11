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
@CrossOrigin("*")
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    //  get all message from game's chat by game's name
    @GetMapping("/{gameName}")
    public ResponseEntity<?> getChat(@Valid @PathVariable String gameName) {
        log.info("/chat/{" + gameName + "} run");
        return ResponseEntity.ok(chatService.getAllMessage(gameName));
    }

    //  create new message in input game
    @PostMapping(value = "/create")
    public ResponseEntity<?> createNewMessage(@Valid @RequestBody  CreateNewMessage createNewMessage) {
        log.info("/chat/create with posted " + createNewMessage + " run");
        return ResponseEntity.ok(chatService.createMessage(createNewMessage));
    }
}

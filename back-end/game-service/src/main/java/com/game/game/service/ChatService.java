package com.game.game.service;

import com.game.game.DAO.CreateNewMessage;
import com.game.game.DAO.CreateNewReply;
import com.game.game.model.Chat;
import com.game.game.model.Game;
import com.game.game.model.Message;
import com.game.game.repository.ChatRepository;
import com.game.game.repository.GameRepository;
import com.game.game.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class ChatService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    //  get all message from game's chat
    public List<Message> getAllMessage(String name) {

        // TODO check if user with input game name exist

        Chat existChat = gameRepository.findByName(name).get().getChat();
        List<Message> messageList = existChat.getData();

        log.info("all Message : " + messageList + " in Chat : " + existChat.getGame());

        return messageList;
    }

    //  create new message in input game
    public List<Message> createMessage(CreateNewMessage createNewMessage) {

        // TODO check if user with input game name exist

        Message newMessage = Message.builder()
                .date(createNewMessage.getDate())
                .message(createNewMessage.getMessage())
                .username(createNewMessage.getUsername())
                .build();

        messageRepository.save(newMessage);

        Game existGame = gameRepository.findByName(createNewMessage.getGame()).get();
        Chat existChat = existGame.getChat();
        List<Message> messageList = existChat.getData();

        messageList.add(newMessage);

        chatRepository.save(existChat);

        log.info("new  Message : " + newMessage + " in Chat : " + existChat.getGame());
        log.info("all Message : " + messageList + " in Chat : " + existChat.getGame());

        return messageList;
    }

    //  create new reply in input game and parent message
    public List<Message> createReply(CreateNewReply createNewReply) {

        // TODO check if user with input game name exist

        Message existParentMessage = messageRepository.findById(Long.parseLong(createNewReply.getParent())).get();

        Message newReply = Message.builder()
                .parent(existParentMessage)
                .date(createNewReply.getDate())
                .message(createNewReply.getMessage())
                .username(createNewReply.getUsername())
                .build();

        messageRepository.save(newReply);

        existParentMessage.getReplies().add(newReply);

        Game existGame = gameRepository.findByName(createNewReply.getGame()).get();
        Chat existChat = existGame.getChat();
        List<Message> messageList = existChat.getData();

        messageList.add(newReply);

        chatRepository.save(existChat);

        log.info("new  Reply : " + newReply + " in Parent Message : " + existParentMessage.getMessage());
        log.info("all Message : " + messageList + " in Chat : " + existChat.getGame());

        return messageList;
    }

    //  get all repy from game's chat
    public Set<Message> getReplies(String messageId) {

        // TODO check if user with input game name exist

        Message existMessage = messageRepository.findById(Long.parseLong(messageId)).get();

        log.info("all Reply : " + existMessage.getReplies() + " in Parent Mesage : " + existMessage.getMessage());

        return existMessage.getReplies();
    }
}

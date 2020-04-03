package com.game.game.service;

import com.game.game.DAO.CreateNewMessage;
import com.game.game.DAO.CreateNewReply;
import com.game.game.model.Chat;
import com.game.game.model.Game;
import com.game.game.model.Message;
import com.game.game.repository.ChatRepository;
import com.game.game.repository.GameRepository;
import com.game.game.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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

        return messageList;
    }

    //  create new reply in input game and parent message
    public List<Message> createReply(CreateNewReply createNewReply) {

        // TODO check if user with input game name exist

        Message existParentMessage = messageRepository.findById(Long.parseLong(createNewReply.getParent())).get();

        Message newMessage = Message.builder()
                .parent(existParentMessage)
                .date(createNewReply.getDate())
                .message(createNewReply.getMessage())
                .username(createNewReply.getUsername())
                .build();

        messageRepository.save(newMessage);

        Game existGame = gameRepository.findByName(createNewReply.getGame()).get();
        Chat existChat = existGame.getChat();
        List<Message> messageList = existChat.getData();

        messageList.add(newMessage);

        chatRepository.save(existChat);

        return messageList;
    }

    //  get all message from game's chat
    public List<Message> getReplies(String messageId) {

        // TODO check if user with input game name exist

        Message existMessage = messageRepository.findById(Long.parseLong(messageId)).get();
        List<Message> repliesList = (List) existMessage.getReplies();

        return repliesList;
    }
}

package com.game.user;

import com.game.user.model.User;
import com.game.user.payload.CreateUser;
import com.game.user.repository.UserRepository;
import com.game.user.service.UserService;
import com.game.user.web.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultHandler;

import java.util.Set;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
class UserApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserRepository userRepository;

	@MockBean
	private UserService userService;

	@Test
	void getUserTest() throws Exception {
		when(userService.getByUsername("Zakhar")).thenReturn(userRepository.findByUsername("Zakhar")
				.orElseThrow(() -> new RuntimeException("NO Zakhar in test"))
		);
		mockMvc.perform(get("/user/Zakhar"))
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@Sql
	void createUserTest() throws Exception {
		CreateUser createUserTest = CreateUser.builder()
				.name("Zakhar")
				.surname("Kostyshyn")
				.username("TestZakhar")
				.email("test@gmail.com")
				.role(Set.of("ROLE_ADMIN", "ROLE_TEACHER"))
				.build();
		when(userService.createUser(createUserTest)).thenReturn(userRepository.findByUsername("Zakhar")
				.orElseThrow(() -> new RuntimeException("NO Zakhar in test"))
		);
		mockMvc.perform(get("/user/create"))
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	void accessDeniedTest() throws Exception {
		mockMvc.perform(post("/game-service/chat/create"))
				.andDo(print())
				.andExpect(status().is4xxClientError());
	}
}

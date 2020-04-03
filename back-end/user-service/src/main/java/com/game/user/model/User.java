package com.game.user.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.TreeSet;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "users_table", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "password")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @NotBlank(message = "Field 'name' must be filled")
    @Size(max = 40)
    private String name;

    @NotBlank(message = "Field 'surname' must be filled")
    @Size(max = 40)
    private String surname;

    @NotBlank(message = "Field 'username' must be filled")
    @Size(max = 10)
    private String username;

    @NotBlank(message = "Field 'password' must be filled")
    @Size(max = 40)
    private String password;

    @Email(message = "This is not email, please enter correct data")
    @NotBlank(message = "Field 'email' must be filled")
    @Size(max = 20)
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles_table",
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new TreeSet<>();

}
package com.game.user.payload;

import lombok.*;

import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class StatsAdd {

    private final String username;
    private final String score;
    private final String time;

}

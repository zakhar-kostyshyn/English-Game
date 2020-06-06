package com.game.user.payload;


import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class StatsResponse {

    private final Long time;
    private final Long score;
    private final Long gameCounter;

}


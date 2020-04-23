package com.game.user.security;

public enum SecurityConstants {
    AUTHORIZATION("Authorization"),
    BEARER("Bearer "),
    VALID(5 * 60 * 60),
    SECRET("Secret"),
    ROLES("ROLES");

    public final String value;
    SecurityConstants(String value) {
        this.value = value;
    }

    SecurityConstants(Integer value) {
        this.value = Integer.toString(value);
    }
}

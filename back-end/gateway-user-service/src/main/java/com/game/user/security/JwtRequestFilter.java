package com.game.user.security;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import static com.game.user.security.SecurityConstants.*;

import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //  get token
        final Optional<String> token = getToken(request);

        token.ifPresent(t -> {
            try {
                if (jwtTokenService.validateToken(t))
                    setSecurityContext(new WebAuthenticationDetailsSource().buildDetails(request), t);
            } catch (IllegalArgumentException | MalformedJwtException | ExpiredJwtException e) {
                log.error("Unable to get JWT Token or JWT Token has expired");

                //  fill context with anonymous
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken("anonymous", "anonymous", null);
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
        });

        filterChain.doFilter(request, response);
    }

    //  fill context
    private void setSecurityContext(WebAuthenticationDetails details, String token) {

        final String username = jwtTokenService.getUsernameFromToken(token);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        //  add details
        authentication.setDetails(details);

        //  fill context with authentication
        SecurityContextHolder.getContext().setAuthentication(authentication);

        log.info("fill context");
    }

    //  get token from header "Authorization"
    private static Optional<String> getToken(HttpServletRequest request) {

        final String token = request.getHeader(AUTHORIZATION.value);

        if (StringUtils.hasText(token) && token.startsWith(BEARER.value))
            return Optional.of(token.substring(7));

        return Optional.empty();
    }
}
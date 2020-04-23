package com.game.user.security;

import static com.game.user.security.SecurityConstants.*;
import static java.util.Calendar.HOUR;

import com.game.user.exceptions.TokenException;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.SignatureException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtTokenService {

    public  String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public  Date getExpirationDateFromToken(String token) {
        return  getClaimFromToken(token, Claims::getExpiration);
    }

    public  List<String> getRolesFromToken(String token) {
        return getClaimFromToken(token, claims -> (List<String>) claims.get(ROLES.value));
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET.value).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generateToken(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Date now = new Date();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(HOUR, 5);
        Date exspire = calendar.getTime();

        String username = userDetails.getUsername();
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(exspire)
                .signWith(SignatureAlgorithm.HS512, SECRET.value)
                .claim(SECRET.value, authentication)
                .compact();

    }

    public Boolean validateToken(String token) {
        try {
            final String username = getUsernameFromToken(token);
            return username != null && !isTokenExpired(token);
        } catch(MalformedJwtException ex){
            throw new TokenException("Invalid JWT toke");
        }catch(ExpiredJwtException ex){
            throw new TokenException("Expired jwt token");
        }catch(UnsupportedJwtException ex){
            throw new TokenException("Unsupported Jwt token");
        }catch(IllegalArgumentException ex){
            throw new TokenException("Jwt claims string is empty");
        }
    }

}

package com.endava.projectassignment2.service.impl;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import com.endava.projectassignment2.enums.ErrorMessage;
import com.endava.projectassignment2.exception.JWTKeyGenerationException;
import com.endava.projectassignment2.model.Users;
import com.endava.projectassignment2.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class JwtServiceImpl implements JwtService{
	
	
	private String secretkey = "";

    public JwtServiceImpl() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            secretkey = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new JWTKeyGenerationException(ErrorMessage.SECRET_KEY_GENERATION_FAILED.getMessage());
        }
    }

	@Override	
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
                .and()
                .signWith(getKey())
                .compact();
    }
	
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretkey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

	@Override
	public String extractUserName(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	@Override
    public boolean validateToken(String token, Users user) { 
	    String extractedUsername = extractUserName(token);
	    return extractedUsername.equals(user.getUserName()) && !isTokenExpired(token); 
    }
	
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}

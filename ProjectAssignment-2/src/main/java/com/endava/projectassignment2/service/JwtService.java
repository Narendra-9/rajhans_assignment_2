package com.endava.projectassignment2.service;

import com.endava.projectassignment2.model.Users;

public interface JwtService {
	
	 public String generateToken(String username);
	 
	 public String extractUserName(String token);
	 
	 public boolean validateToken(String token, Users user);
}

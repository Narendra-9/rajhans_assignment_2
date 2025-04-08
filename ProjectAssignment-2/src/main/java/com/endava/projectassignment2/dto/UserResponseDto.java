package com.endava.projectassignment2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
	
	private long id;
	
	private String firstName;
	
	private String lastName;
	
	private String userName;
	
	private String email;
	
	private String role;
	
	private boolean active;
	
	private int wrongAttempts;
}



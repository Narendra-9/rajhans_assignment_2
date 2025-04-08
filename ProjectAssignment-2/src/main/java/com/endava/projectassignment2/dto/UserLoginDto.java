package com.endava.projectassignment2.dto;

import jakarta.validation.constraints.NotBlank;

public record UserLoginDto (
		
		@NotBlank(message = "Username is required")
		String userName,
		
		@NotBlank(message = "Password is required")
		String password

){}

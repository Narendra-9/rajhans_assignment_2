package com.endava.projectassignment2.dto;

import jakarta.validation.constraints.NotBlank;

public record DeactivateUserDto (
	
	long id,
	
	@NotBlank(message = "oldPassword is required")
	String password
	
){}

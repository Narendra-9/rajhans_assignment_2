package com.endava.projectassignment2.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserRegisterDto (
		
		@NotBlank(message = "First name is required")
		@Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
		String firstName,
		
	    @NotBlank(message = "Last name is required")
	    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
		String lastName,
		
	    @NotBlank(message = "Username is required")
	    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
		String userName,
		
	    @NotBlank(message = "Email is required")
	    @Email(message = "Email must be valid")
		String email,
		
	    @NotBlank(message = "Password is required")
	    @Size(min = 8, max = 100, message = "Password must be at least 8 characters")
	    @Pattern(
	        regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
	        message = "Password must contain at least one uppercase, one lowercase, one digit, and one special character"
	    )
		String password,
		
	    @NotBlank(message = "Confirm password is required")
		String confirmPassword

) {}

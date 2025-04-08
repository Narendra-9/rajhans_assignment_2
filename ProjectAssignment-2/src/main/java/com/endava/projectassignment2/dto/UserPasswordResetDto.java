package com.endava.projectassignment2.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record UserPasswordResetDto (
	
	@Positive(message = "ID must be a positive number")
	long id,
	
	@NotBlank(message = "oldPassword is required")
	String oldPassword,
	
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be at least 8 characters")
    @Pattern(
	    regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
        message = "Password must contain at least one uppercase, one lowercase, one digit, and one special character"
	)
	String newPassword,
	
	@NotBlank(message = "ConfirmPassword is required")
	String confirmPassword
) {}

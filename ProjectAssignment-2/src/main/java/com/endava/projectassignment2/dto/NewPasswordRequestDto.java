package com.endava.projectassignment2.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record NewPasswordRequestDto (
	
	@NotBlank(message = "Token is required")
	String token,
	
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

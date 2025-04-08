package com.endava.projectassignment2.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {

	private long id;
	
	@Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
	private String firstName;
	
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
	private String lastName;

    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
	private String userName;
	
    @Email(message = "Email must be valid")
	private String email;
	
}

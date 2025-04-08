package com.endava.projectassignment2.mapper;

import org.springframework.stereotype.Component;

import com.endava.projectassignment2.dto.UserResponseDto;
import com.endava.projectassignment2.model.Users;

@Component
public class UserMapper {
	
	public UserResponseDto toUserResponseDto(Users user) {
		
		return UserResponseDto.builder()
				.id(user.getId())
				.firstName(user.getFirstName())
				.lastName(user.getLastName())
				.userName(user.getUserName())
				.email(user.getEmail())
				.active(user.isActive())
				.wrongAttempts(user.getWrongAttempt())
				.build();
	}
}

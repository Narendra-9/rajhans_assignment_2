package com.endava.projectassignment2.service;

import com.endava.projectassignment2.dto.DeactivateUserDto;
import com.endava.projectassignment2.dto.NewPasswordRequestDto;
import com.endava.projectassignment2.dto.UserLoginDto;
import com.endava.projectassignment2.dto.UserPasswordResetDto;
import com.endava.projectassignment2.dto.UserRegisterDto;
import com.endava.projectassignment2.dto.UserResponseDto;
import com.endava.projectassignment2.dto.UserUpdateDto;
import com.endava.projectassignment2.util.Page;

import reactor.core.publisher.Mono;

public interface UserService {
	
	Mono<Page<UserResponseDto>> getAllUsers(int page , int size);
	
	Mono<Page<UserResponseDto>> search(String keyword ,int page , int size);
	
	Mono<UserResponseDto> getUserById(long id);
	
	Mono<UserResponseDto> loginUser(UserLoginDto userLoginDto); 
	
	Mono<UserResponseDto> registerUser(UserRegisterDto userRegisterDto);
	
	Mono<UserResponseDto> updateUser(UserUpdateDto userUpdateDto);
		
	Mono<Void> deactivateUser(DeactivateUserDto deactivateUserDto);
	
	Mono<Void> resetPassword(UserPasswordResetDto userPasswordResetDto);
	
	Mono<String> forgotPassword(String email);
	
	Mono<Void> setNewPassword(NewPasswordRequestDto newPasswordRequestDto);
	
	Mono<Boolean> checkTokenExists(String token);
	
	Mono<Void> deactivateUserById(long id);
	
	Mono<Void> activateUserById(long id);
	
	Mono<Void> resetLockByUserId(long id);
		
}

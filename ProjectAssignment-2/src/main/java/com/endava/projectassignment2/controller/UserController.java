package com.endava.projectassignment2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.endava.projectassignment2.dto.DeactivateUserDto;
import com.endava.projectassignment2.dto.NewPasswordRequestDto;
import com.endava.projectassignment2.dto.UserLoginDto;
import com.endava.projectassignment2.dto.UserPasswordResetDto;
import com.endava.projectassignment2.dto.UserRegisterDto;
import com.endava.projectassignment2.dto.UserUpdateDto;
import com.endava.projectassignment2.enums.StatusMessage;
import com.endava.projectassignment2.enums.URLConstants;
import com.endava.projectassignment2.service.UserService;
import com.endava.projectassignment2.util.ApiGenericResponse;
import com.endava.projectassignment2.util.ApiGenericResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping(URLConstants.USER_BASE_URL)
public class UserController {
	
	private final UserService userService;
	
	@GetMapping
	public Mono<ResponseEntity<ApiGenericResponse>> getAllUsers(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size){
		return userService.getAllUsers(page,size)
				.flatMap(pageOfUsers->
						ApiGenericResponseUtil.createSuccessResponse(
							pageOfUsers,
							StatusMessage.USERS_FETCHED.getMessage(),
							HttpStatus.OK)
				);
	}
	
	
	@GetMapping(path = URLConstants.SEARCH)
	public Mono<ResponseEntity<ApiGenericResponse>> search(
			@RequestParam String keyword,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size){
		return userService.search(keyword,page,size)
				.flatMap(pageOfUsers->
						ApiGenericResponseUtil.createSuccessResponse(
							pageOfUsers,
							StatusMessage.SEARCH_RESULTS_FETCHED.getMessage(),
							HttpStatus.OK)
				);
	}
	
	@GetMapping(path = URLConstants.USER_GET)
	public Mono<ResponseEntity<ApiGenericResponse>> getUser(@PathVariable long id){
		return userService.getUserById(id)
				.flatMap(response -> 
				ApiGenericResponseUtil.createSuccessResponse(
						response,
						StatusMessage.USER_FETCHED.getMessage(),
						HttpStatus.OK));
	}
	
	
	@PutMapping(path = URLConstants.UPDATE_USER,produces = URLConstants.APPLICATION_JSON,consumes = URLConstants.APPLICATION_JSON)
	public Mono<ResponseEntity<ApiGenericResponse>> updateUser(@Valid @RequestBody UserUpdateDto userUpdateDto){
		return userService.updateUser(userUpdateDto)
				.flatMap(response -> 
				ApiGenericResponseUtil.createSuccessResponse(
						response,
						StatusMessage.USERS_FETCHED.getMessage(),
						HttpStatus.OK));
	}
	
	@PostMapping(path = URLConstants.USER_REGISTER,produces = URLConstants.APPLICATION_JSON,consumes = URLConstants.APPLICATION_JSON)
	public Mono<ResponseEntity<ApiGenericResponse>> registerUser(@Valid @RequestBody UserRegisterDto userRegisterDto){
		return userService.registerUser(userRegisterDto)
				.flatMap(response -> 
				ApiGenericResponseUtil.createSuccessResponse(
						response,
						StatusMessage.USER_REGISTERED.getMessage(),
						HttpStatus.OK));
	}
	
	@PostMapping(path = URLConstants.USER_LOGIN)
	public Mono<ResponseEntity<ApiGenericResponse>> loginUser(@Valid @RequestBody UserLoginDto userLoginDto){
		return userService.loginUser(userLoginDto)
				.flatMap(response -> 
				ApiGenericResponseUtil.createSuccessResponse(
						response,
						StatusMessage.USER_LOGGED.getMessage(),
						HttpStatus.OK));
	}
	
	@PutMapping(path = URLConstants.DEACTIVATE_USER,consumes = URLConstants.APPLICATION_JSON)
	public Mono<ResponseEntity<String>> deactivateUser(@Valid @RequestBody DeactivateUserDto deactivateUserDto){
		return userService.deactivateUser(deactivateUserDto)
				.thenReturn(
						ResponseEntity
							.status(HttpStatus.OK)
							.body(StatusMessage.USER_DEACTIVATD.getMessage()));
	}
	
	@PutMapping(path = URLConstants.RESET_PASSWORD,produces = URLConstants.APPLICATION_JSON,consumes = URLConstants.APPLICATION_JSON)
	public Mono<ResponseEntity<String>> resetPassword(@Valid @RequestBody UserPasswordResetDto userPasswordResetDto){
		return userService.resetPassword(userPasswordResetDto)
				.thenReturn(
						ResponseEntity
							.status(HttpStatus.OK)
							.body(StatusMessage.PASSWORD_RESET_SUCCESS.getMessage()));
	}
	
	
	@PutMapping(path = URLConstants.FORGOT_PASSWORD)
	public Mono<ResponseEntity<ApiGenericResponse>> forgotPassword(@RequestParam String email){
		return userService.forgotPassword(email)
				.flatMap(response -> 
				ApiGenericResponseUtil.createSuccessResponse(
						response,
						StatusMessage.RESET_PASSWORD_LINK_SENT.getMessage(),
						HttpStatus.OK));
	}
	
	@PutMapping(path = URLConstants.NEW_PASSWORD,produces = URLConstants.APPLICATION_JSON,consumes = URLConstants.APPLICATION_JSON)
	public Mono<ResponseEntity<String>> setNewPassword(@RequestBody NewPasswordRequestDto newPasswordRequestDto){
		return userService.setNewPassword(newPasswordRequestDto)
				.thenReturn(
						ResponseEntity.status(HttpStatus.OK)
									  .body(StatusMessage.NEW_PASSWORD_SET.getMessage()));
	}
	
	@GetMapping(path = URLConstants.TOKEN_EXISTS)
	public Mono<ResponseEntity<ApiGenericResponse>> checkTokenExists(@RequestParam String token){
		return userService.checkTokenExists(token)
				.flatMap(response -> 
				ApiGenericResponseUtil.createSuccessResponse(
						response,
						StatusMessage.TOKEN_VALIDITY_SUCCESS.getMessage(),
						HttpStatus.OK));
	}
	
}

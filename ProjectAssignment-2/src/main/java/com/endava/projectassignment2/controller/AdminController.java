package com.endava.projectassignment2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.endava.projectassignment2.enums.StatusMessage;
import com.endava.projectassignment2.enums.URLConstants;
import com.endava.projectassignment2.service.UserService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(URLConstants.ADMIN_BASE_URL)
@RequiredArgsConstructor
public class AdminController {
	
	private final UserService userService;
	
	@PutMapping(path = URLConstants.ADMIN_USER_DEACTIVATE)
	public Mono<ResponseEntity<String>> deactivateAccount(@PathVariable long id){
		return userService.deactivateUserById(id)
				.thenReturn(ResponseEntity.status(HttpStatus.OK)
						.body(StatusMessage.USER_DEACTIVATD.getMessage()));
	}
	
	@PutMapping(path = URLConstants.ADMIN_USER_ACTIVATE)
	public Mono<ResponseEntity<String>> activateUser(@PathVariable long id){
		return userService.activateUserById(id)
				.thenReturn(ResponseEntity.status(HttpStatus.OK)
						.body(StatusMessage.USER_ACTIVATED.getMessage()));
	}
	
	@PutMapping(path = URLConstants.ADMIN_RESET_LOCK)
	public Mono<ResponseEntity<String>> resetLock(@PathVariable long id){
		return userService.resetLockByUserId(id)
				.thenReturn(ResponseEntity.status(HttpStatus.OK)
						.body(StatusMessage.RESET_LOCK_SUCCESS.getMessage()));
	}
}

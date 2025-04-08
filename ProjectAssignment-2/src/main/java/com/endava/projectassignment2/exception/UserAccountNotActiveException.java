package com.endava.projectassignment2.exception;

public class UserAccountNotActiveException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public UserAccountNotActiveException(String message) {
		super(message);
	}
	
}

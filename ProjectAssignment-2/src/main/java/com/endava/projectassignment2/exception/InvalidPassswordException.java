package com.endava.projectassignment2.exception;

public class InvalidPassswordException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public InvalidPassswordException(String message) {
		super(message);
	}

}

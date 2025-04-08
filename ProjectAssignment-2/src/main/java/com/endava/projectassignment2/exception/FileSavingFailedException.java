package com.endava.projectassignment2.exception;

public class FileSavingFailedException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public FileSavingFailedException(String message) {
		super(message);
	}

}

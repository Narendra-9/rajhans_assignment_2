package com.endava.projectassignment2.enums;

public enum ErrorMessage {	
	
	CANNOT_INSTANTIATED("Utility class should not be instantiated"),
	USER_NOT_FOUND("User Not Found"),
	ACCOUNT_LOCKED("Your account is locked due to multiple failed login attempts. Try Again Tommorrow or Contact HelpDesk"),
	INVALID_CREDENTIALS("Invalid Credentials"),
	UNAUTHORIZED_ACCESS("Unauthorized Access"),
	APPLICATION_JSON("Application/Json"),
	REQUEST_FAILED("Request failed"),
	AUTHENTICATION_FAILED("Authentication Failed"),
	PASSOWRD_NOT_MATCH("Password do not match"),
	USERNAME_EXISTS("UserName Already Taken, Try a Differnt one."),
	EMAIL_EXITS("Email Already Exists"),
	USER_DEACTIVATED("User Deactivated"),
	ROLE_NOT_EXISTS("Role Not Exists."),
	SECRET_KEY_GENERATION_FAILED("Failed to generate JWT secret key"),
	INVALID_TOKEN("Invalid Reset Request"),
	EMPTY_USERS_LIST("Users List Empty"),
	NO_USERS_FOUND("No Users Found"),
	FILE_DELETE_FAIL("Failed to delete the file"),
	FILE_SAVE_FAILED("Failed to save the file"),
	FILE_NOT_FOUND("File not Found"),
	INVALID_FILE_FORMAT("Invalid file format: No extension found."),
	NEW_PASSWORD_EXISTS("New password cannot be same as old password"),
	INVALID_PASSWORD("Invalid Password");
	
	private final String message;

	ErrorMessage(String message) {
		this.message = message;
	}
	
	public String getMessage() {
        return message;
    }

}

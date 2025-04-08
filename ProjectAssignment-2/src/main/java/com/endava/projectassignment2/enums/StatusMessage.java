package com.endava.projectassignment2.enums;

public enum StatusMessage {
	
	USERS_FETCHED("Users Fetched Successfully."),
	USER_FETCHED("User Fetched Successfully"),
	USER_REGISTERED("User Registered Successfully."),
	USER_LOGGED("User LoggedIn Successfully."),
	USER_DEACTIVATD("User Deactivated Successfully."),
	USER_UPDATED("User Updated Successfully."),
	RESET_PASSWORD_LINK_SENT("Reset password link sent successfully."),
	NEW_PASSWORD_SET("Password Changed Succesfully, Login to Continue"),
	IMAGE_UPLOADED("Image Uploaded Successfully"),
	IMAGE_FETCHED("Image Fetched Successfully"),
	PASSWORD_RESET_SUCCESS("Password reset Successfully."),
	SEARCH_RESULTS_FETCHED("search results fetched"),
	TOKEN_VALIDITY_SUCCESS("Token Validity fetched Successfully"),
	RESET_LOCK_SUCCESS("Lock reset successfully"),
	USER_ACTIVATED("User activated successfully");
	
	
	
	private final String message;

	StatusMessage(String message) {
		this.message = message;
	}
	
	public String getMessage() {
        return message;
    }
}

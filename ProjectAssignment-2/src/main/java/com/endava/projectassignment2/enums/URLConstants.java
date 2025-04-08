package com.endava.projectassignment2.enums;

public class URLConstants {
	
    private URLConstants() {
        throw new UnsupportedOperationException(ErrorMessage.CANNOT_INSTANTIATED.getMessage());
    }
	
	public static final String USER_BASE_URL="/users";
	public static final String IMAGE_BASE_URL="/images";
	public static final String USER_GET="/{id}";
	public static final String USER_USERNAME="/{username}";
	public static final String USER_REGISTER="/register";
	public static final String USER_LOGIN="/login";
	public static final String IMAGE_UPLOAD="/{id}/uploadImage";
	public static final String DEACTIVATE_USER="/deactivate";
	public static final String UPDATE_USER="/update"; 
	public static final String FORGOT_PASSWORD="/forgotPassword"; 
	public static final String RESET_PASSWORD="/resetPassword"; 
	public static final String NEW_PASSWORD="/newPassword"; 
	public static final String SEARCH="/search"; 
	public static final String TOKEN_EXISTS="/token"; 
	public static final String APPLICATION_JSON="application/json";
	public static final String PASSWORD_RESET_LINK="http://localhost:5173/reset-password/";
	
	public static final String ADMIN_BASE_URL="/admin";
	public static final String ADMIN_USER_DEACTIVATE="/users/{id}/deactivate";
	public static final String ADMIN_USER_ACTIVATE="/users/{id}/activate";
	public static final String ADMIN_RESET_LOCK="/users/{id}/resetLock";
}

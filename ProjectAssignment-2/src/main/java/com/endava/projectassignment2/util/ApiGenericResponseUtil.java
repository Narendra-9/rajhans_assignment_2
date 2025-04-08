package com.endava.projectassignment2.util;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.endava.projectassignment2.enums.ErrorMessage;

import reactor.core.publisher.Mono;



/**
 * Utility class for building Generic API responses.
 * Provides methods to create success and error responses with custom HTTP status codes.
 */
public class ApiGenericResponseUtil {
	
	
    // Private constructor to prevent instantiation
    private ApiGenericResponseUtil() {
        throw new UnsupportedOperationException(ErrorMessage.CANNOT_INSTANTIATED.getMessage());
    }
	

	public static Mono<ResponseEntity<ApiGenericResponse>> createSuccessResponse(Object body, String message, HttpStatus status) {
        return 	Mono.just(
	        		ResponseEntity.status(status)
	                .body(ApiGenericResponse.builder()
	                    .statusMessage(message)
	                    .body(body)
	                    .build()
                ));
        		
    }
	
	
    public static Mono<ResponseEntity<ApiGenericResponse>> createErrorResponse(String errorMessage,HttpStatus status) {
        return 	Mono.just(
	        		ResponseEntity.status(status)
	                .body(ApiGenericResponse.builder()
	                    .statusMessage(ErrorMessage.REQUEST_FAILED.getMessage())
	                    .errorMessage(errorMessage)
	                    .build()
                ));
    }
}

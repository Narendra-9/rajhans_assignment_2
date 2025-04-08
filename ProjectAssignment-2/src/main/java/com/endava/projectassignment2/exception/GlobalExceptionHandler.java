package com.endava.projectassignment2.exception;

import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;

import com.endava.projectassignment2.util.ApiGenericResponse;
import com.endava.projectassignment2.util.ApiGenericResponseUtil;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(exception = WebExchangeBindException.class)
	public Mono<ResponseEntity<String>> handleRequestBodyError(WebExchangeBindException ex){
		 String error = ex.getBindingResult().getAllErrors().stream()
				.map(DefaultMessageSourceResolvable::getDefaultMessage)
				.sorted()
				.collect(Collectors.joining("\n"));
		return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error));
	}
	
	@ExceptionHandler(exception = EmptyUsersListException.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handleEmptyUsersListException(EmptyUsersListException exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	
	@ExceptionHandler(exception = RecordNotFoundException.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handleRecordNotFoundException(RecordNotFoundException exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(exception = RecordAlreadyExists.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handleRecordAlreadyExists(RecordAlreadyExists exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.CONFLICT);
	}
	

	@ExceptionHandler(exception = InvalidPassswordException.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handleInvalidPassswordException(InvalidPassswordException exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(exception = PasswordMismatchException.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handlePasswordMismatchException(PasswordMismatchException exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(exception = UserAccountLockedException.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handleUserAccountLockedException(UserAccountLockedException exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.LOCKED);
	}
	
	@ExceptionHandler(exception = UserAccountNotActiveException.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handleUserAccountNotActiveException(UserAccountNotActiveException exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.FORBIDDEN);
	}
	
	@ExceptionHandler(exception = FileSavingFailedException.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handleFileSavingFailedException(FileSavingFailedException exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(exception = Exception.class)
	public Mono<ResponseEntity<ApiGenericResponse>> handleException(Exception exception){		
		return ApiGenericResponseUtil.createErrorResponse(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

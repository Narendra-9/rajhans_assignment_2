package com.endava.projectassignment2.service.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.endava.projectassignment2.dto.DeactivateUserDto;
import com.endava.projectassignment2.dto.NewPasswordRequestDto;
import com.endava.projectassignment2.dto.UserLoginDto;
import com.endava.projectassignment2.dto.UserPasswordResetDto;
import com.endava.projectassignment2.dto.UserRegisterDto;
import com.endava.projectassignment2.dto.UserResponseDto;
import com.endava.projectassignment2.dto.UserUpdateDto;
import com.endava.projectassignment2.enums.ErrorMessage;
import com.endava.projectassignment2.enums.RoleType;
import com.endava.projectassignment2.enums.URLConstants;
import com.endava.projectassignment2.exception.EmptyUsersListException;
import com.endava.projectassignment2.exception.InvalidPassswordException;
import com.endava.projectassignment2.exception.PasswordMismatchException;
import com.endava.projectassignment2.exception.RecordAlreadyExists;
import com.endava.projectassignment2.exception.RecordNotFoundException;
import com.endava.projectassignment2.exception.UserAccountLockedException;
import com.endava.projectassignment2.exception.UserAccountNotActiveException;
import com.endava.projectassignment2.mapper.UserMapper;
import com.endava.projectassignment2.model.UserRole;
import com.endava.projectassignment2.model.Users;
import com.endava.projectassignment2.repository.RoleMasterRepository;
import com.endava.projectassignment2.repository.UserRepository;
import com.endava.projectassignment2.repository.UserRoleRepository;
import com.endava.projectassignment2.service.UserService;
import com.endava.projectassignment2.util.Page;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserRepository userRepository;
	
	private final RoleMasterRepository roleMasterRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	private final UserRoleRepository userRoleRepository;
	
	private final UserMapper userMapper;

	public Mono<Page<UserResponseDto>> getAllUsers(int page,int size) {
		
        int offset = page * size;
        int limit = size; 
        
        Flux<UserResponseDto> usersFlux = userRepository
        									.findAllPaginated(limit, offset)
        									.flatMap(user->roleMasterRepository.findUserRoleById(user.getId())
        											.map(role->{
        												UserResponseDto userResponseDto=userMapper
        														.toUserResponseDto(user);
        												userResponseDto.setRole(role);
        												return userResponseDto;
        											})
        									);
        
        Mono<Long> totalUsersCount = userRepository
        								.count();
        
        return totalUsersCount.zipWith(usersFlux.collectList())
        					  .flatMap(tuple->{
        						  if(tuple.getT2().isEmpty()) {
        			                    return Mono.error(new EmptyUsersListException(
        			                    		ErrorMessage.NO_USERS_FOUND.getMessage()));
        						  }
        						  
        						  return Mono.just(new Page<>(tuple.getT2(), tuple.getT1(), page, size));
        					  });
        
	}
	
	@Override
	public Mono<Page<UserResponseDto>> search(String keyword, int page, int size) {
		
        int offset = page * size;
        int limit = size; 
        
        Flux<UserResponseDto> usersFlux = userRepository
				.searchResults(keyword, limit, offset)
				.flatMap(user->roleMasterRepository.findUserRoleById(user.getId())
						.map(role->{
							UserResponseDto userResponseDto=userMapper
									.toUserResponseDto(user);
							userResponseDto.setRole(role);
							return userResponseDto;
						})
				);
        
        Mono<Long> totalMatchedUsersCount=userRepository.countMatchingUsers(keyword);
        
        return totalMatchedUsersCount.zipWith(usersFlux.collectList())
				  .flatMap(tuple->{
					  if(tuple.getT2().isEmpty()) {
		                    return Mono.error(new EmptyUsersListException(
		                    		ErrorMessage.NO_USERS_FOUND.getMessage()));
					  }
					  
					  return Mono.just(new Page<>(tuple.getT2(), tuple.getT1(), page, size));
				  });
	}

	@Override
	public Mono<UserResponseDto> updateUser(UserUpdateDto userUpdateDto) {

		return userRepository.findById(userUpdateDto.getId())
				.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
		        .flatMap(existingUser ->
	            	checkUserNameAndEmail(existingUser, userUpdateDto)
	            	.then(updateUserDetails(existingUser, userUpdateDto))
		        )
		        .flatMap(userRepository::save)
				.map(userMapper::toUserResponseDto);
	}
	
	
	private Mono<Void> checkUserNameAndEmail(Users existingUser, UserUpdateDto userUpdateDto) {
		
		//Here I am making a call if the username is a new username only.
	    Mono<Boolean> userNameExists = 
	    		( userUpdateDto.getUserName() != null && 
	    		  !userUpdateDto.getUserName().equals(existingUser.getUserName()) )
	        ? userRepository.existsByUserName(userUpdateDto.getUserName()) 
	        : Mono.just(false);

	    //Here I am making a call if the email is a new email only.
	    Mono<Boolean> emailExists = 
	    		( userUpdateDto.getEmail() != null &&
	    		  !userUpdateDto.getEmail().equals(existingUser.getEmail()) )
	        ? userRepository.existsByEmail(userUpdateDto.getEmail()) 
	        : Mono.just(false);

	    return Mono.zip(userNameExists, emailExists)
	        .flatMap(tuple -> {
	            boolean isUserNameTaken = tuple.getT1();
	            boolean isEmailTaken = tuple.getT2();

	            if (isUserNameTaken) {
	                return Mono.error(new RecordAlreadyExists(ErrorMessage.USERNAME_EXISTS.getMessage()));
	            }
	            if (isEmailTaken) {
	                return Mono.error(new RecordAlreadyExists(ErrorMessage.EMAIL_EXITS.getMessage()));
	            }
	            return Mono.empty();
	        });
	        
	}
	
	
	private Mono<Users> updateUserDetails(Users existingUser, UserUpdateDto userUpdateDto) {
		
		/*
		 *  Here I have done this way cause passing through postman,
		 *  I can neglect repetition of fields while setting.
		 */
	    if (userUpdateDto.getFirstName() != null) {
	        existingUser.setFirstName(userUpdateDto.getFirstName());
	    }
	    if (userUpdateDto.getLastName() != null) {
	        existingUser.setLastName(userUpdateDto.getLastName());
	    }
	    if (userUpdateDto.getEmail() != null) {
	        existingUser.setEmail(userUpdateDto.getEmail());
	    }
	    if (userUpdateDto.getUserName() != null) {
	        existingUser.setUserName(userUpdateDto.getUserName());
	    }

	    existingUser.setModifiedDate(LocalDateTime.now());
	    return Mono.just(existingUser);
	}

	@Override
	public Mono<UserResponseDto> getUserById(long id) {
		
		return userRepository.findById(id)
				.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
				.flatMap(user->roleMasterRepository.findUserRoleById(user.getId())
						.map(role->{
							UserResponseDto userResponseDto=userMapper.toUserResponseDto(user);
							userResponseDto.setRole(role);
							return userResponseDto;
						}));
				
	}


	@Override
	public Mono<Void> resetPassword(UserPasswordResetDto userPasswordResetDto) {
		
		return userRepository.findById(userPasswordResetDto.id())
				.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
				.flatMap(user->{
					if(!user.isActive()) {
						return Mono.error(new UserAccountNotActiveException(ErrorMessage.USER_DEACTIVATED.getMessage()));
					}
					if(!passwordEncoder.matches(userPasswordResetDto.oldPassword(), user.getPassword())) {
						return Mono.error(new InvalidPassswordException(ErrorMessage.INVALID_PASSWORD.getMessage()));
					}
					if(!userPasswordResetDto.newPassword().equals(userPasswordResetDto.confirmPassword())) {
						return Mono.error(new PasswordMismatchException(ErrorMessage.PASSOWRD_NOT_MATCH.getMessage()));
					}
					user.setPassword(passwordEncoder.encode(userPasswordResetDto.confirmPassword()));
					
					return userRepository.save(user);
				}).then();
				
	}

	@Override
	public Mono<String> forgotPassword(String email) {
		return userRepository.findByEmail(email)
				.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
				.flatMap(user->{
					String token = UUID.randomUUID().toString();
					
					user.setToken(token);
					
					return userRepository.save(user)
							.thenReturn(URLConstants.PASSWORD_RESET_LINK+ token);
				});
	}

	@Override
	public Mono<Void> setNewPassword(NewPasswordRequestDto newPasswordRequestDto) {
		return userRepository.findByToken(newPasswordRequestDto.token())
					.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.INVALID_TOKEN.getMessage())))
					.flatMap(user->{
						if(passwordEncoder.matches(newPasswordRequestDto.newPassword(), user.getPassword())) {
							return Mono.error(new RecordAlreadyExists(ErrorMessage.NEW_PASSWORD_EXISTS.getMessage()));
						}
						if(!newPasswordRequestDto.newPassword().equals(newPasswordRequestDto.confirmPassword())) {
							return Mono.error(new PasswordMismatchException(ErrorMessage.PASSOWRD_NOT_MATCH.getMessage()));
						}
						user.setPassword(passwordEncoder.encode(newPasswordRequestDto.confirmPassword()));
						user.setToken(null);
						return userRepository.save(user).then();
					});
	}

	@Override
	public Mono<Void> deactivateUser(DeactivateUserDto deactivateUserDto) {
		return userRepository.findById(deactivateUserDto.id())
				.flatMap(user -> {
					
					if(!passwordEncoder.matches(deactivateUserDto.password(), user.getPassword())) {
						return Mono.error(new InvalidPassswordException(ErrorMessage.INVALID_PASSWORD.getMessage()));
					}
					
					user.setActive(false);
					return userRepository.save(user).then();
				});
	}

	@Override
	public Mono<UserResponseDto> loginUser(UserLoginDto userLoginDto) {
		
		return userRepository.findByUserName(userLoginDto.userName())
				.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
				.flatMap(user->{
					
					if(user.getWrongAttempt()>=3) {
						return Mono.error(new UserAccountLockedException(ErrorMessage.ACCOUNT_LOCKED.getMessage()));
					}
					
					if(!passwordEncoder.matches(userLoginDto.password(), user.getPassword())) {
						user.setWrongAttempt(user.getWrongAttempt()+1);
						
						return userRepository.save(user)
								.then(Mono.error(new InvalidPassswordException(ErrorMessage.INVALID_PASSWORD.getMessage())));
					}
					
					if(!user.isActive()) {
						return Mono.error(new UserAccountNotActiveException(ErrorMessage.USER_DEACTIVATED.getMessage()));
					}
					
					
					user.setWrongAttempt(0);
					return userRepository.save(user)
							.flatMap(userentity->roleMasterRepository.findUserRoleById(userentity.getId())
									.map(role->{
										UserResponseDto userResponseDto=userMapper.toUserResponseDto(user);
										userResponseDto.setRole(role);
										return userResponseDto;
									}));
				});
	}

	@Override
	public Mono<UserResponseDto> registerUser(UserRegisterDto userRegisterDto) {
		
		return userRepository.findByEmail(userRegisterDto.email())
				.hasElement()
				.flatMap(userExists->{
					if(userExists.booleanValue()) {
						return Mono.error(new RecordAlreadyExists(ErrorMessage.EMAIL_EXITS.getMessage()));
					}
					
					return userRepository.findByUserName(userRegisterDto.userName());
				})
				.hasElement()
				.flatMap(userNameExists->{
					if(userNameExists.booleanValue()) {
						return Mono.error(new RecordAlreadyExists(ErrorMessage.USERNAME_EXISTS.getMessage()));
					}
					
	                String hashedPassword = passwordEncoder.encode(userRegisterDto.password());

	                Users user = Users.builder()
	                        .firstName(userRegisterDto.firstName())
	                        .lastName(userRegisterDto.lastName())
	                        .userName(userRegisterDto.userName())
	                        .email(userRegisterDto.email())
	                        .password(hashedPassword)
	                        .createdDate(LocalDateTime.now())
	                        .isActive(true)
	                        .build();
	                
	                return userRepository.save(user);
				})
				.flatMap(user->
					roleMasterRepository.findByRoleType(RoleType.ROLE_USER)
						.flatMap(roleMaster->
							userRoleRepository.save(UserRole.builder()
									.userId(user.getId())
									.roleId(roleMaster.getId())
									.build()
							)
							.thenReturn(roleMaster.getRoleType())
						)
						.flatMap(roletype->{
							UserResponseDto userResponseDto=userMapper.toUserResponseDto(user);
							userResponseDto.setRole(roletype.name());
							return Mono.just(userResponseDto);
						})
						
				);

	}

	@Override
	public Mono<Boolean> checkTokenExists(String token) {
		return userRepository.findByToken(token).hasElement();
	}

	@Override
	public Mono<Void> deactivateUserById(long id) {
		return userRepository.findById(id)
				.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
				.flatMap(user->{
					user.setActive(false);
					
					return userRepository.save(user);
				})
				.then();
	}
	
	
	@Override
	public Mono<Void> resetLockByUserId(long id) {
		return userRepository.findById(id)
				.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
				.flatMap(user->{
					user.setWrongAttempt(0);
					
					return userRepository.save(user);
				})
				.then();
	}

	@Override
	public Mono<Void> activateUserById(long id) {
		return userRepository.findById(id)
				.switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
				.flatMap(user->{
					user.setActive(true);
					
					return userRepository.save(user);
				})
				.then();
	}

}

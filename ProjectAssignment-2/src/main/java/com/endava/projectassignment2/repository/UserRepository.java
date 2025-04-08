package com.endava.projectassignment2.repository;

import org.springframework.data.r2dbc.repository.Modifying;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.endava.projectassignment2.model.Users;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Repository
public interface UserRepository extends R2dbcRepository<Users, Long>{
	
	@Query("SELECT * FROM users ORDER BY id OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY")
	Flux<Users> findAllPaginated(@Param("limit") int limit, @Param("offset") int offset);
	
	@Query("""
		    SELECT * FROM users 
		    WHERE LOWER(first_name) LIKE '%' + LOWER(:keyword) + '%'
		       OR LOWER(last_name) LIKE '%' + LOWER(:keyword) + '%'
		    ORDER BY created_date DESC
		    OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
		""")
	Flux<Users> searchResults(@Param("keywrod") String keyword,@Param("limit") int limit,@Param("offset") int offset);
	
	@Query("""
		    SELECT COUNT(*) FROM users 
		    WHERE LOWER(first_name) LIKE LOWER(:keyword) 
		       OR LOWER(last_name) LIKE LOWER(:keyword)
		""")
	Mono<Long> countMatchingUsers(String keyword);
	
	Mono<Users> findByEmail(String email);
	
	Mono<Users> findByToken(String token);
	
	Mono<Users> findByUserName(String userName);
	
	@Modifying
    @Query("UPDATE users SET wrong_attempts = 0 WHERE wrong_attempts > 0")
    Mono<Integer> resetWrongAttempts();

	@Modifying
    @Query("UPDATE users SET reset_token = NULL WHERE reset_token IS NOT NULL")
    Mono<Integer> resetAllTokens();
    
    // Check if a user with the given username exists
    Mono<Boolean> existsByUserName(String userName);
    
    // Check if a user with the given email exists
    Mono<Boolean> existsByEmail(String email);
    
}

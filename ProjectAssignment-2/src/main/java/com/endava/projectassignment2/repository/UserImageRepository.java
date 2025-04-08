package com.endava.projectassignment2.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.endava.projectassignment2.model.UserImage;

import reactor.core.publisher.Mono;

public interface UserImageRepository extends R2dbcRepository<UserImage, Long>{
	
	Mono<UserImage> findByUserId(Long userId);
}

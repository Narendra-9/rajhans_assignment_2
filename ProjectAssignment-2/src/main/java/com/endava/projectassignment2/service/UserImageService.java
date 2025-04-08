package com.endava.projectassignment2.service;

import org.springframework.http.codec.multipart.FilePart;

import com.endava.projectassignment2.dto.ImageResponseDto;

import reactor.core.publisher.Mono;

public interface UserImageService {
	
	Mono<Void> uploadProfilePhoto(long userId , FilePart multipartFile);
	
	Mono<ImageResponseDto> getProfilePhoto(long userId);
}

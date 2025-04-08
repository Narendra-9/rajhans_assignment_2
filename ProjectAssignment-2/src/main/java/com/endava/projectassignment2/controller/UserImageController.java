package com.endava.projectassignment2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.endava.projectassignment2.enums.StatusMessage;
import com.endava.projectassignment2.enums.URLConstants;
import com.endava.projectassignment2.service.UserImageService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(URLConstants.IMAGE_BASE_URL)
@RequiredArgsConstructor
public class UserImageController {
	
	private final UserImageService userImageService;
	
	@PostMapping(path = URLConstants.IMAGE_UPLOAD, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Mono<ResponseEntity<String>> uploadImage(@RequestPart("image") Mono<FilePart> fileMono, @PathVariable long id){
		return fileMono.flatMap(file->
			userImageService.uploadProfilePhoto(id, file)
			.thenReturn(ResponseEntity.status(HttpStatus.CREATED).body(StatusMessage.IMAGE_UPLOADED.getMessage()))
		);

	}
	
	
	@GetMapping(path = URLConstants.USER_GET)
	public Mono<ResponseEntity<byte[]>> getImage(@PathVariable long id){
		return userImageService.getProfilePhoto(id)
				.flatMap(image->Mono.just(
							ResponseEntity.status(HttpStatus.OK)
							.contentType(MediaType.valueOf(image.getContentType()))
							.body(image.getImageUrl()))			
				);	
		}
}

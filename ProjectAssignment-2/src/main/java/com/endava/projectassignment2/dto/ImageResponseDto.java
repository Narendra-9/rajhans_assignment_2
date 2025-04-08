package com.endava.projectassignment2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
// Here I wantedly not using record, cause it is showing some warning to code hashcode and equals when using byte[].
public class ImageResponseDto {
	
	private byte[] imageUrl;
	
	private String contentType;
}

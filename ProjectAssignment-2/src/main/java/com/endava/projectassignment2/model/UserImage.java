package com.endava.projectassignment2.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserImage {
	
	@Id
	private Long id;
	
	@Column("fk_user_id")
	private Long userId;
	
	private String name;
	
	private String type;
	
	@Column("file_path")
	private String filePath;
	
	
}

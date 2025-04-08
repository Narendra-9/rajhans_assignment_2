package com.endava.projectassignment2.model;

import java.time.LocalDateTime;

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
public class Users {
	
	@Id
	private Long id;
	
	@Column("first_name")
	private String firstName;
	
	@Column("last_name")
	private String lastName;
	
	@Column("user_name")
	private String userName;
	
	private String email;
	
	private String password;
	
	@Column("wrong_attempt")
	private int wrongAttempt;
	
	private String token;
	
	@Column("active")
	private boolean isActive;
	
	@Column("created_date")
	private LocalDateTime createdDate;
	
	@Column("modified_date")
	private LocalDateTime modifiedDate;
	
	@Column("created_by")
	private Long createdBy;
	
	@Column("modified_by")
	private Long modifiedBy;
}

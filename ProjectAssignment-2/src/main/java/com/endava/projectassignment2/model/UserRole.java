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
public class UserRole {
	
	@Id
	private Long id;
	
	@Column("fk_user_id")
	private Long userId;
	
	@Column("fk_role_id")
	private Long roleId;
	
}

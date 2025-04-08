package com.endava.projectassignment2.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import com.endava.projectassignment2.enums.RoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoleMaster {
	
	@Id
	private Long id;
	
	@Column("role_type")
	private RoleType roleType;
	
	@Column("created_date")
	private LocalDateTime createdDate;
	
	@Column("modified_date")
	private LocalDateTime modifiedDate;
	
	@Column("created_by")
	private Long createdBy;
	
	@Column("modified_by")
	private Long modifiedBy;
}

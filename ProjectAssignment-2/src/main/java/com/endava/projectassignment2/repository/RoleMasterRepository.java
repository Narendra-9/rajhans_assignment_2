package com.endava.projectassignment2.repository;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.Param;

import com.endava.projectassignment2.enums.RoleType;
import com.endava.projectassignment2.model.RoleMaster;

import reactor.core.publisher.Mono;

public interface RoleMasterRepository extends R2dbcRepository<RoleMaster, Long>{
	
	@Query("SELECT r.role_type from user_role ur inner join role_master r on ur.fk_role_id=r.id where ur.fk_user_id = :id")
	Mono<String> findUserRoleById(@Param("id") Long id);
	
	Mono<RoleMaster> findByRoleType(RoleType roleType);
}

package com.endava.projectassignment2.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.endava.projectassignment2.model.UserRole;

public interface UserRoleRepository extends R2dbcRepository<UserRole, Long>{

}

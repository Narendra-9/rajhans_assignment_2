CREATE TABLE users (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NULL,
    user_name VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    wrong_attempt INT DEFAULT 0,
    token VARCHAR(255) NULL,
    active BIT NOT NULL DEFAULT 1,
    created_date DATETIME DEFAULT GETDATE(),
    modified_date DATETIME DEFAULT GETDATE(),
    created_by BIGINT NULL,
    modified_by BIGINT NULL
);

CREATE TABLE user_image (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    fk_user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
	FOREIGN KEY (fk_user_id) REFERENCES users(id),
);

CREATE TABLE role_master (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    role_type VARCHAR(50) UNIQUE NOT NULL,
    created_date DATETIME DEFAULT GETDATE(),
    modified_date DATETIME DEFAULT GETDATE(),
    created_by BIGINT NULL,
    modified_by BIGINT NULL
);

CREATE TABLE user_role (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    fk_user_id BIGINT NOT NULL,
    fk_role_id BIGINT NOT NULL,
    FOREIGN KEY (fk_user_id) REFERENCES users(id),
    FOREIGN KEY (fk_role_id) REFERENCES role_master(id) 
);

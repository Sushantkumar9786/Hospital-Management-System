package com.healthcare.ohms.repository;

import com.healthcare.ohms.entity.User;
import com.healthcare.ohms.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    List<Role> findByRole(Role role);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

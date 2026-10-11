package com.healthcare.ohms.service.impl;

import com.healthcare.ohms.dto.response.UserSummaryResponse;
import com.healthcare.ohms.entity.User;
import com.healthcare.ohms.exception.ResourceNotFoundException;
import com.healthcare.ohms.repository.UserRepository;
import com.healthcare.ohms.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public UserSummaryResponse getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserSummaryResponse.fromEntity(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserSummaryResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return UserSummaryResponse.fromEntity(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserSummaryResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserSummaryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}

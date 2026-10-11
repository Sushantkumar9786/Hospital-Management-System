package com.healthcare.ohms.service;

import com.healthcare.ohms.dto.response.UserSummaryResponse;
import com.healthcare.ohms.entity.User;
import com.healthcare.ohms.enums.Role;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserSummaryResponse getUserById(UUID id);
    UserSummaryResponse getUserByUsername(String username);
    List<UserSummaryResponse> getAllUsers();
    User createUser(User user);
}

package com.healthcare.ohms.dto.response;

import com.healthcare.ohms.entity.User;
import com.healthcare.ohms.enums.Role;
import java.util.UUID;

public record UserSummaryResponse(
    UUID id,
    String username,
    String email,
    String fullName,
    Role role
) {
    public static UserSummaryResponse fromEntity(User user) {
        return new UserSummaryResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFullName(),
            user.getRole()
        );
    }
}

package com.healthcare.ohms.dto.response;

import com.healthcare.ohms.enums.Role;
import java.util.UUID;

public record JwtAuthResponse(
    String accessToken,
    String tokenType,
    UUID userId,
    String username,
    String fullName,
    Role role
) {
    public JwtAuthResponse(String accessToken, UUID userId, String username, String fullName, Role role) {
        this(accessToken, "Bearer", userId, username, fullName, role);
    }
}

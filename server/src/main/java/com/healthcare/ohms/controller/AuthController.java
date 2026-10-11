package com.healthcare.ohms.controller;

import com.healthcare.ohms.config.JwtTokenProvider;
import com.healthcare.ohms.dto.request.LoginRequest;
import com.healthcare.ohms.dto.response.JwtAuthResponse;
import com.healthcare.ohms.entity.User;
import com.healthcare.ohms.exception.ResourceNotFoundException;
import com.healthcare.ohms.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication Gateway", description = "Stateless JWT token issuance and user identity verification")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserRepository userRepository, 
                          PasswordEncoder passwordEncoder, 
                          JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and issue JWT token")
    public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = userRepository.findByUsernameOrEmail(request.usernameOrEmail(), request.usernameOrEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(user.getUsername(), user.getId(), user.getRole().name());

        return ResponseEntity.ok(new JwtAuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getRole()
        ));
    }
}

package com.healthcare.ohms.controller;

import com.healthcare.ohms.config.JwtTokenProvider;
import com.healthcare.ohms.dto.request.LoginRequest;
import com.healthcare.ohms.dto.request.RegisterRequest;
import com.healthcare.ohms.dto.response.JwtAuthResponse;
import com.healthcare.ohms.entity.User;
import com.healthcare.ohms.exception.ResourceNotFoundException;
import com.healthcare.ohms.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

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

    @PostMapping("/register")
    @Operation(summary = "Register a new user identity (Doctor or Patient)")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Username '" + request.username() + "' is already taken."));
        }
        if (userRepository.existsByEmail(request.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email '" + request.email() + "' is already registered."));
        }

        User user = new User(
                UUID.randomUUID(),
                request.username(),
                request.email(),
                passwordEncoder.encode(request.password()),
                request.fullName(),
                request.role()
        );
        User saved = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(saved.getUsername(), saved.getId(), saved.getRole().name());

        return ResponseEntity.status(HttpStatus.CREATED).body(new JwtAuthResponse(
                token,
                saved.getId(),
                saved.getUsername(),
                saved.getFullName(),
                saved.getRole()
        ));
    }
}

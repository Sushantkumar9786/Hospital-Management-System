package com.healthcare.ohms.controller;

import com.healthcare.ohms.dto.response.UserSummaryResponse;
import com.healthcare.ohms.entity.User;
import com.healthcare.ohms.repository.AppointmentRepository;
import com.healthcare.ohms.repository.UserRepository;
import com.healthcare.ohms.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Administration & Governance", description = "Facility oversight, staff provisioning, and clinical audit metrics")
public class AdminController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    public AdminController(UserService userService, 
                           UserRepository userRepository, 
                           AppointmentRepository appointmentRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/users")
    @Operation(summary = "List all registered identities across network")
    public ResponseEntity<List<UserSummaryResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/users")
    @Operation(summary = "Provision new clinical staff or administrative identity")
    public ResponseEntity<UserSummaryResponse> createUser(@Valid @RequestBody User user) {
        User created = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserSummaryResponse.fromEntity(created));
    }

    @GetMapping("/metrics")
    @Operation(summary = "Get high-level healthcare facility telemetry")
    public ResponseEntity<Map<String, Object>> getFacilityMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalUsers", userRepository.count());
        metrics.put("totalAppointments", appointmentRepository.count());
        metrics.put("systemStatus", "OPERATIONAL");
        metrics.put("auditCompliance", "HIPAA_VERIFIED");
        return ResponseEntity.ok(metrics);
    }
}

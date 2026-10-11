package com.healthcare.ohms.controller;

import com.healthcare.ohms.dto.request.AppointmentBookingRequest;
import com.healthcare.ohms.dto.response.AppointmentResponse;
import com.healthcare.ohms.entity.DoctorSlot;
import com.healthcare.ohms.repository.DoctorSlotRepository;
import com.healthcare.ohms.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/appointments")
@Tag(name = "Appointment Scheduling", description = "Concurrency-safe doctor slot reservation with JPA Pessimistic Locking")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final DoctorSlotRepository doctorSlotRepository;

    public AppointmentController(AppointmentService appointmentService, 
                                 DoctorSlotRepository doctorSlotRepository) {
        this.appointmentService = appointmentService;
        this.doctorSlotRepository = doctorSlotRepository;
    }

    @PostMapping("/book")
    @Operation(summary = "Book appointment slot using exclusive row-level lock")
    public ResponseEntity<AppointmentResponse> bookAppointment(
            @Valid @RequestBody AppointmentBookingRequest request,
            @RequestParam UUID patientId) {
        AppointmentResponse response = appointmentService.bookAppointment(request, patientId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Get all scheduled appointments for a patient")
    public ResponseEntity<List<AppointmentResponse>> getPatientAppointments(@PathVariable UUID patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForPatient(patientId));
    }

    @GetMapping("/doctor/{doctorId}")
    @Operation(summary = "Get all scheduled appointments for a doctor")
    public ResponseEntity<List<AppointmentResponse>> getDoctorAppointments(@PathVariable UUID doctorId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForDoctor(doctorId));
    }

    @GetMapping("/slots/{doctorId}")
    @Operation(summary = "List all open/unbooked slots for a doctor")
    public ResponseEntity<List<DoctorSlot>> getAvailableSlots(@PathVariable UUID doctorId) {
        return ResponseEntity.ok(doctorSlotRepository.findByDoctorIdAndIsBookedFalse(doctorId));
    }
}

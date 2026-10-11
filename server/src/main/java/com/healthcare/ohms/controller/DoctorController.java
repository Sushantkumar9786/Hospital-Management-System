package com.healthcare.ohms.controller;

import com.healthcare.ohms.dto.request.MedicalRecordCreateRequest;
import com.healthcare.ohms.dto.response.AppointmentResponse;
import com.healthcare.ohms.entity.MedicalRecord;
import com.healthcare.ohms.service.AppointmentService;
import com.healthcare.ohms.service.MedicalRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctor")
@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
@Tag(name = "Doctor Clinical Operations", description = "Physician workstation, SOAP notes recording, and appointment roster")
public class DoctorController {

    private final AppointmentService appointmentService;
    private final MedicalRecordService medicalRecordService;

    public DoctorController(AppointmentService appointmentService, 
                            MedicalRecordService medicalRecordService) {
        this.appointmentService = appointmentService;
        this.medicalRecordService = medicalRecordService;
    }

    @GetMapping("/appointments/{doctorId}")
    @Operation(summary = "Doctor daily patient queue and scheduled consultations")
    public ResponseEntity<List<AppointmentResponse>> getAppointments(@PathVariable UUID doctorId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForDoctor(doctorId));
    }

    @PostMapping("/records")
    @Operation(summary = "Commit SOAP clinical consultation notes and e-prescription")
    public ResponseEntity<MedicalRecord> createMedicalRecord(
            @Valid @RequestBody MedicalRecordCreateRequest request,
            @RequestParam UUID doctorId) {
        MedicalRecord record = medicalRecordService.createRecord(request, doctorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(record);
    }

    @GetMapping("/records/patient/{patientId}")
    @Operation(summary = "Review historical electronic health record for patient")
    public ResponseEntity<List<MedicalRecord>> getPatientRecords(@PathVariable UUID patientId) {
        return ResponseEntity.ok(medicalRecordService.getRecordsByPatient(patientId));
    }
}

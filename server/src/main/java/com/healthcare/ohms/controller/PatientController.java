package com.healthcare.ohms.controller;

import com.healthcare.ohms.dto.response.AppointmentResponse;
import com.healthcare.ohms.entity.MedicalRecord;
import com.healthcare.ohms.service.AppointmentService;
import com.healthcare.ohms.service.MedicalRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/patient")
@PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
@Tag(name = "Patient Self-Service Portal", description = "Access electronic health record, vitals timeline, and personal appointments")
public class PatientController {

    private final AppointmentService appointmentService;
    private final MedicalRecordService medicalRecordService;

    public PatientController(AppointmentService appointmentService, 
                             MedicalRecordService medicalRecordService) {
        this.appointmentService = appointmentService;
        this.medicalRecordService = medicalRecordService;
    }

    @GetMapping("/appointments/{patientId}")
    @Operation(summary = "View patient scheduled and past consultations")
    public ResponseEntity<List<AppointmentResponse>> getAppointments(@PathVariable UUID patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForPatient(patientId));
    }

    @GetMapping("/records/{patientId}")
    @Operation(summary = "Retrieve verified EMR records and past digital prescriptions")
    public ResponseEntity<List<MedicalRecord>> getMedicalRecords(@PathVariable UUID patientId) {
        return ResponseEntity.ok(medicalRecordService.getRecordsByPatient(patientId));
    }
}

package com.healthcare.ohms.dto.request;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record MedicalRecordCreateRequest(
    @NotNull(message = "Patient ID is required")
    UUID patientId,

    UUID appointmentId,
    String chiefComplaint,
    String subjectiveNotes,
    String objectiveFindings,
    String diagnosis,
    String treatmentPlan,
    String prescriptionJson
) {}

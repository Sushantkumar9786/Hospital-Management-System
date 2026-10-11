package com.healthcare.ohms.dto.response;

import com.healthcare.ohms.entity.Appointment;
import com.healthcare.ohms.enums.AppointmentStatus;
import java.time.LocalDateTime;
import java.util.UUID;

public record AppointmentResponse(
    UUID id,
    UUID patientId,
    UUID doctorId,
    LocalDateTime scheduledAt,
    AppointmentStatus status,
    String reasonForVisit,
    LocalDateTime createdAt
) {
    public static AppointmentResponse fromEntity(Appointment appointment) {
        return new AppointmentResponse(
            appointment.getId(),
            appointment.getPatientId(),
            appointment.getDoctorId(),
            appointment.getScheduledAt(),
            appointment.getStatus(),
            appointment.getReasonForVisit(),
            appointment.getCreatedAt()
        );
    }
}

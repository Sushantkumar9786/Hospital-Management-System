package com.healthcare.ohms.entity;

import com.healthcare.ohms.enums.AppointmentStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID patientId;

    @Column(nullable = false)
    private UUID doctorId;

    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status;

    private String reasonForVisit;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Appointment() {}

    public Appointment(UUID id, UUID patientId, UUID doctorId, LocalDateTime scheduledAt, 
                       AppointmentStatus status, String reasonForVisit, LocalDateTime createdAt) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.scheduledAt = scheduledAt;
        this.status = status;
        this.reasonForVisit = reasonForVisit;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private UUID id;
        private UUID patientId;
        private UUID doctorId;
        private LocalDateTime scheduledAt;
        private AppointmentStatus status;
        private String reasonForVisit;
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(UUID id) { this.id = id; return this; }
        public Builder patientId(UUID patientId) { this.patientId = patientId; return this; }
        public Builder doctorId(UUID doctorId) { this.doctorId = doctorId; return this; }
        public Builder scheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; return this; }
        public Builder status(AppointmentStatus status) { this.status = status; return this; }
        public Builder reasonForVisit(String reasonForVisit) { this.reasonForVisit = reasonForVisit; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Appointment build() {
            return new Appointment(id, patientId, doctorId, scheduledAt, status, reasonForVisit, createdAt);
        }
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getPatientId() { return patientId; }
    public void setPatientId(UUID patientId) { this.patientId = patientId; }

    public UUID getDoctorId() { return doctorId; }
    public void setDoctorId(UUID doctorId) { this.doctorId = doctorId; }

    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }

    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }

    public String getReasonForVisit() { return reasonForVisit; }
    public void setReasonForVisit(String reasonForVisit) { this.reasonForVisit = reasonForVisit; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

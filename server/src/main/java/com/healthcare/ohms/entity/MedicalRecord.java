package com.healthcare.ohms.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID patientId;

    @Column(nullable = false)
    private UUID doctorId;

    private UUID appointmentId;

    @Column(columnDefinition = "TEXT")
    private String chiefComplaint;

    @Column(columnDefinition = "TEXT")
    private String subjectiveNotes;

    @Column(columnDefinition = "TEXT")
    private String objectiveFindings;

    @Column(columnDefinition = "TEXT")
    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String treatmentPlan;

    @Column(columnDefinition = "TEXT")
    private String prescriptionJson;

    @Column(nullable = false, updatable = false)
    private LocalDateTime recordedAt = LocalDateTime.now();

    public MedicalRecord() {}

    public MedicalRecord(UUID patientId, UUID doctorId, String diagnosis, String treatmentPlan) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.diagnosis = diagnosis;
        this.treatmentPlan = treatmentPlan;
        this.recordedAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getPatientId() { return patientId; }
    public void setPatientId(UUID patientId) { this.patientId = patientId; }

    public UUID getDoctorId() { return doctorId; }
    public void setDoctorId(UUID doctorId) { this.doctorId = doctorId; }

    public UUID getAppointmentId() { return appointmentId; }
    public void setAppointmentId(UUID appointmentId) { this.appointmentId = appointmentId; }

    public String getChiefComplaint() { return chiefComplaint; }
    public void setChiefComplaint(String chiefComplaint) { this.chiefComplaint = chiefComplaint; }

    public String getSubjectiveNotes() { return subjectiveNotes; }
    public void setSubjectiveNotes(String subjectiveNotes) { this.subjectiveNotes = subjectiveNotes; }

    public String getObjectiveFindings() { return objectiveFindings; }
    public void setObjectiveFindings(String objectiveFindings) { this.objectiveFindings = objectiveFindings; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getTreatmentPlan() { return treatmentPlan; }
    public void setTreatmentPlan(String treatmentPlan) { this.treatmentPlan = treatmentPlan; }

    public String getPrescriptionJson() { return prescriptionJson; }
    public void setPrescriptionJson(String prescriptionJson) { this.prescriptionJson = prescriptionJson; }

    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }
}

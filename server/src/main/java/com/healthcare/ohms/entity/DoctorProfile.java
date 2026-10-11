package com.healthcare.ohms.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "doctor_profiles")
public class DoctorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String specialty;

    private String qualification;
    private Integer experienceYears;
    private String roomNumber;
    private boolean isAvailableOnDuty = true;

    public DoctorProfile() {}

    public DoctorProfile(UUID userId, String specialty, String qualification, String roomNumber) {
        this.userId = userId;
        this.specialty = specialty;
        this.qualification = qualification;
        this.roomNumber = roomNumber;
        this.isAvailableOnDuty = true;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public boolean isAvailableOnDuty() { return isAvailableOnDuty; }
    public void setAvailableOnDuty(boolean availableOnDuty) { isAvailableOnDuty = availableOnDuty; }
}

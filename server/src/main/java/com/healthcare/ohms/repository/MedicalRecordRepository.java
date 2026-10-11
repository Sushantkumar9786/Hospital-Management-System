package com.healthcare.ohms.repository;

import com.healthcare.ohms.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, UUID> {
    List<MedicalRecord> findByPatientId(UUID patientId);
    List<MedicalRecord> findByDoctorId(UUID doctorId);
}

package com.healthcare.ohms.service;

import com.healthcare.ohms.dto.request.MedicalRecordCreateRequest;
import com.healthcare.ohms.entity.MedicalRecord;

import java.util.List;
import java.util.UUID;

public interface MedicalRecordService {
    MedicalRecord createRecord(MedicalRecordCreateRequest request, UUID doctorId);
    List<MedicalRecord> getRecordsByPatient(UUID patientId);
    List<MedicalRecord> getRecordsByDoctor(UUID doctorId);
}

package com.healthcare.ohms.service.impl;

import com.healthcare.ohms.dto.request.MedicalRecordCreateRequest;
import com.healthcare.ohms.entity.MedicalRecord;
import com.healthcare.ohms.repository.MedicalRecordRepository;
import com.healthcare.ohms.service.MedicalRecordService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;

    public MedicalRecordServiceImpl(MedicalRecordRepository medicalRecordRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
    }

    @Override
    @Transactional
    public MedicalRecord createRecord(MedicalRecordCreateRequest request, UUID doctorId) {
        MedicalRecord record = new MedicalRecord();
        record.setPatientId(request.patientId());
        record.setDoctorId(doctorId);
        record.setAppointmentId(request.appointmentId());
        record.setChiefComplaint(request.chiefComplaint());
        record.setSubjectiveNotes(request.subjectiveNotes());
        record.setObjectiveFindings(request.objectiveFindings());
        record.setDiagnosis(request.diagnosis());
        record.setTreatmentPlan(request.treatmentPlan());
        record.setPrescriptionJson(request.prescriptionJson());
        record.setRecordedAt(LocalDateTime.now());

        return medicalRecordRepository.save(record);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicalRecord> getRecordsByPatient(UUID patientId) {
        return medicalRecordRepository.findByPatientId(patientId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicalRecord> getRecordsByDoctor(UUID doctorId) {
        return medicalRecordRepository.findByDoctorId(doctorId);
    }
}

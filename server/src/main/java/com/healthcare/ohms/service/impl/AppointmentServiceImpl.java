package com.healthcare.ohms.service.impl;

import com.healthcare.ohms.dto.request.AppointmentBookingRequest;
import com.healthcare.ohms.dto.response.AppointmentResponse;
import com.healthcare.ohms.entity.Appointment;
import com.healthcare.ohms.entity.DoctorSlot;
import com.healthcare.ohms.enums.AppointmentStatus;
import com.healthcare.ohms.exception.SlotAlreadyBookedException;
import com.healthcare.ohms.repository.AppointmentRepository;
import com.healthcare.ohms.repository.DoctorSlotRepository;
import com.healthcare.ohms.service.AppointmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final DoctorSlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(DoctorSlotRepository slotRepository, 
                                  AppointmentRepository appointmentRepository) {
        this.slotRepository = slotRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    @Transactional
    public AppointmentResponse bookAppointment(AppointmentBookingRequest request, UUID patientId) {
        // Obtains exclusive row lock; waits or throws if another transaction touches it
        DoctorSlot slot = slotRepository.findSlotForBookingWithLock(request.slotId())
                .orElseThrow(() -> new SlotAlreadyBookedException("This slot is no longer available."));

        slot.setBooked(true);
        slotRepository.save(slot);

        Appointment appointment = Appointment.builder()
                .patientId(patientId)
                .doctorId(slot.getDoctorId())
                .scheduledAt(slot.getStartTime())
                .status(AppointmentStatus.CONFIRMED)
                .reasonForVisit(request.reason())
                .build();

        Appointment saved = appointmentRepository.save(appointment);
        return AppointmentResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsForPatient(UUID patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(AppointmentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsForDoctor(UUID doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream()
                .map(AppointmentResponse::fromEntity)
                .collect(Collectors.toList());
    }
}

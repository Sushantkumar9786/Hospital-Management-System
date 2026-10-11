package com.healthcare.ohms.service;

import com.healthcare.ohms.dto.request.AppointmentBookingRequest;
import com.healthcare.ohms.dto.response.AppointmentResponse;

import java.util.List;
import java.util.UUID;

public interface AppointmentService {
    AppointmentResponse bookAppointment(AppointmentBookingRequest request, UUID patientId);
    List<AppointmentResponse> getAppointmentsForPatient(UUID patientId);
    List<AppointmentResponse> getAppointmentsForDoctor(UUID doctorId);
}

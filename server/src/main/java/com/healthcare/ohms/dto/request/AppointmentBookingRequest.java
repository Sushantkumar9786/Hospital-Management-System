package com.healthcare.ohms.dto.request;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record AppointmentBookingRequest(
    @NotNull(message = "Slot ID is required")
    UUID slotId,

    String reason
) {}

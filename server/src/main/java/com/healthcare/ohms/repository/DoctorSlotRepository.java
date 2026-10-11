package com.healthcare.ohms.repository;

import com.healthcare.ohms.entity.DoctorSlot;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorSlotRepository extends JpaRepository<DoctorSlot, UUID> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM DoctorSlot s WHERE s.id = :slotId AND s.isBooked = false")
    Optional<DoctorSlot> findSlotForBookingWithLock(@Param("slotId") UUID slotId);

    List<DoctorSlot> findByDoctorIdAndIsBookedFalse(UUID doctorId);
}

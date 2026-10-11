package com.healthcare.ohms;

import com.healthcare.ohms.entity.DoctorProfile;
import com.healthcare.ohms.entity.DoctorSlot;
import com.healthcare.ohms.entity.PatientProfile;
import com.healthcare.ohms.entity.User;
import com.healthcare.ohms.enums.Role;
import com.healthcare.ohms.repository.DoctorSlotRepository;
import com.healthcare.ohms.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.UUID;

@SpringBootApplication
public class OhmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(OhmsApplication.class, args);
    }

    @Bean
    public CommandLineRunner seedData(UserRepository userRepository, 
                                     DoctorSlotRepository doctorSlotRepository,
                                     PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Admin User
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User(
                        UUID.randomUUID(),
                        "admin",
                        "admin@careplus.health",
                        passwordEncoder.encode("admin123"),
                        "Chief Health Administrator",
                        Role.ROLE_ADMIN
                );
                userRepository.save(admin);
            }

            // Seed Doctor User
            UUID doctorUserId = UUID.fromString("11111111-1111-1111-1111-111111111111");
            if (!userRepository.existsByUsername("dr.kulkarni")) {
                User doctor = new User(
                        doctorUserId,
                        "dr.kulkarni",
                        "dr.kulkarni@careplus.health",
                        passwordEncoder.encode("doctor123"),
                        "Dr. Vivek Kulkarni",
                        Role.ROLE_DOCTOR
                );
                userRepository.save(doctor);

                // Seed open slots for the doctor
                LocalDateTime now = LocalDateTime.now().plusDays(1).withHour(9).withMinute(0).withSecond(0).withNano(0);
                doctorSlotRepository.save(new DoctorSlot(UUID.randomUUID(), doctorUserId, now, now.plusMinutes(30), false));
                doctorSlotRepository.save(new DoctorSlot(UUID.randomUUID(), doctorUserId, now.plusMinutes(30), now.plusMinutes(60), false));
                doctorSlotRepository.save(new DoctorSlot(UUID.randomUUID(), doctorUserId, now.plusHours(1), now.plusHours(1).plusMinutes(30), false));
            }

            // Seed Patient User
            UUID patientUserId = UUID.fromString("22222222-2222-2222-2222-222222222222");
            if (!userRepository.existsByUsername("rahul.patil")) {
                User patient = new User(
                        patientUserId,
                        "rahul.patil",
                        "rahul.patil@careplus.health",
                        passwordEncoder.encode("patient123"),
                        "Rahul Narayan Patil",
                        Role.ROLE_PATIENT
                );
                userRepository.save(patient);
            }
        };
    }
}

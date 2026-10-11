<div align="center">

<img src="./docs/images/logo.png" alt="CarePlus Healthcare Logo" width="220" />

# CarePlus — Online Healthcare Management System (CMS & EMR)

**Enterprise Outpatient Clinic Management System, Electronic Medical Records (EMR) & Patient Portal**

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.5-brightgreen.svg?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21_LTS-orange.svg?logo=openjdk)](https://openjdk.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Spring Security](https://img.shields.io/badge/Spring_Security-6.x-6DB33F.svg?logo=springsecurity)](https://spring.io/projects/spring-security)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Compliance](https://img.shields.io/badge/Compliance-HIPAA%20%7C%20GDPR%20%7C%20ABHA-0E7FE6.svg)](#compliance--security-baseline)

*Recreation and enterprise enhancement of the integrated rural and urban healthcare access platform [HealthWay](https://health-way-beta.vercel.app/), crafted with a clinical trustworthy design system, strict vector iconography (no AI-generated emoji borders), and an enterprise Java Spring Boot 3 N-Tier backend.*

</div>

---

## 📑 Table of Contents

- [1. System Overview](#1-system-overview)
- [2. Key Modules & Features](#2-key-modules--features)
- [3. Enterprise Java Architecture](#3-enterprise-java-architecture)
- [4. High-Concurrency Double-Booking Prevention](#4-high-concurrency-double-booking-prevention)
- [5. Spring Security 6 RBAC](#5-spring-security-6-rbac)
- [6. Project Structure](#6-project-structure)
- [7. Getting Started](#7-getting-started)
- [8. REST API & Swagger UI](#8-rest-api--swagger-ui)
- [9. Compliance & Security Baseline](#9-compliance--security-baseline)

---

## 1. System Overview

**CarePlus** falls into the **HealthTech / Enterprise Healthcare IT** domain, specifically classified as an **Outpatient Clinic Management System (CMS)** with an integrated **Electronic Medical Record (EMR) and Patient Portal**.

The system enables synchronized healthcare coordination across multi-tier regional facilities (District Hospitals, Sub-District Centers, Community Health Centers, and Primary Health Centers), ensuring frictionless patient transfers, real-time waiting room management, clinical consultation documentation, and emergency telematics.

### Design Aesthetics & Trustworthiness
- **Clinical Palette:** Deep Navy (`#0C396E`), Clinical Teal (`#0D9488`), Sky Blue (`#0284C7`), Crisp Slate borders (`#E2E8F0`), and clean backgrounds (`#F8FAFC`).
- **Iconography:** Strict vector SVGs via [Lucide React](https://lucide.dev/) — completely free of AI-generated emoji borders or decorative emoji spam.
- **Typography:** High-contrast Google Fonts (*Inter*, *Plus Jakarta Sans*, *JetBrains Mono*).

---

## 2. Key Modules & Features

### 🏥 1. Regional Facility Command Center
- Real-time operational telemetry across facility hierarchies (District, Sub-District, CHC, PHC).
- Live bed saturation meters, occupied ICU/HDU capacity, on-duty specialist counts, and active OPD queues.
- Dynamic regional emergency alert ticker (e.g., Heatwave triage protocol).

### 🔄 2. 7-Stage Inter-Facility Referral Bridge (Referral Setu)
- Standardized patient transfer protocol:
  $$\text{Initiated} \longrightarrow \text{Triaged} \longrightarrow \text{Transport Booked} \longrightarrow \text{Dispatched} \longrightarrow \text{Arrived} \longrightarrow \text{Specialist Consult} \longrightarrow \text{Completed/Admitted}$$
- Clinical SLA countdown timers, urgency tagging (*Emergency / Red*, *Urgent / Yellow*, *Routine / Green*), baseline vitals telemetry, and 1-click stage advancement.

### 📺 3. Queue TV (Clinic Waiting Room Broadcast Display)
- High-visibility waiting room monitor view for outpatient departments.
- **Web Audio API** synthesized two-tone hospital acoustic chime (`587 Hz` $\to$ `880 Hz`).
- Text-to-speech synthesized patient calling ("*Token T-043, please proceed to OPD Room 101*").
- Real-time upcoming waiting sequence with smart estimated wait time calculations.

### 🧪 4. Diagnostic Coordination & Laboratory Center
- Pathology, biochemistry, hematology, and radiological imaging test requisitioning.
- Automated critical value alerting (e.g., High-sensitivity Cardiac Troponin-I $> 0.04\text{ ng/mL}$).
- Printable ISO 15189 / NABL compliant digital laboratory report viewer modal.

### 🩺 5. Doctor Clinical Workstation & EMR
- Daily OPD consultation queue with triage vitals review and drug allergy alerts.
- Standardized clinical **SOAP** documentation:
  - **S** — Subjective (chief complaint, history of presenting illness)
  - **O** — Objective (examination findings, auscultation, clinical signs)
  - **A** — Assessment (provisional/working ICD-10 diagnosis)
  - **P** — Plan (therapeutic regimen, investigations, lifestyle counseling)
- Digital E-Prescription builder with dosage, frequency, and instructions.

### 👤 6. Citizen Patient Portal & Self-Service
- Universal ABHA / CarePlus Patient Health ID card with barcode rendering.
- Vitals trend telemetry (Blood Pressure, Heart Rate, SpO2, Body Weight / BMI).
- Self-service doctor appointment booking wizard with live slot availability.
- Historical prescription and clinical visit timeline.

### 🚨 7. Emergency 108 Dispatch Gateway
- Immediate life-threatening emergency triage dispatcher with category selection (STEMI, Polytrauma, Stroke, Maternal Labor).
- GPS telematics transmission and ALS ambulance dispatch token generation.

### 🔒 8. Concurrency Sandbox & HIPAA Audit Lab
- Interactive visual simulator demonstrating database row-level locking.
- Cryptographically timestamped HIPAA/GDPR clinical access audit trail table.

---

## 3. Enterprise Java Architecture

The backend is built on an **N-Tier Layered Architecture** using **Spring Boot 3.2+ (Java 21 LTS)**, separating web routing, authorization, domain logic, and persistence.

```
+-----------------------------------------------------------------------------------+
|                        CLIENT INTERFACE (Web / Mobile)                            |
|       React 18 + Vite Single Page UI (Admin, Doctor, Patient Portals)             |
+-----------------------------------------+-----------------------------------------+
                                          | HTTPS / REST / JSON
                                          v
+-----------------------------------------------------------------------------------+
|                           SECURITY & GATEWAY LAYER                                |
|  - Spring Security 6 (SecurityFilterChain)                                        |
|  - JwtAuthenticationFilter (Token Parsing & Stateless Authentication)             |
|  - Method Security (@PreAuthorize("hasRole('ADMIN')"))                            |
+-----------------------------------------+-----------------------------------------+
                                          v
+-----------------------------------------------------------------------------------+
|                             API CONTROLLER LAYER                                  |
|  - AdminController (@RestController)   - DoctorController (@RestController)       |
|  - PatientController (@RestController) - AuthController (@RestController)         |
|  - AppointmentController               - GlobalExceptionHandler                   |
+-----------------------------------------+-----------------------------------------+
                                          v
+-----------------------------------------------------------------------------------+
|                            SERVICE / BUSINESS LAYER                               |
|  - AppointmentService (@Transactional, Pessimistic Locking to stop race condition)|
|  - MedicalRecordService (EHR logging & immutability checks)                       |
|  - UserService (Identity & Role lifecycle)                                        |
+-----------------------------------------+-----------------------------------------+
                                          v
+-----------------------------------------------------------------------------------+
|                        DATA ACCESS / PERSISTENCE LAYER                            |
|  - Spring Data JPA (Repositories)                                                 |
|  - Hibernate ORM (Entity mapping, validation via jakarta.validation)              |
+-----------------------------------------+-----------------------------------------+
                                          v
+-----------------------------------------------------------------------------------+
|                                DATABASE LAYER                                     |
|  - PostgreSQL 15+ (Production) / H2 in PostgreSQL Mode (Development)             |
|  - Flyway / Liquibase database migration support                                  |
+-----------------------------------------------------------------------------------+
```

---

## 4. High-Concurrency Double-Booking Prevention

Double-booking prevention is enforced at the database row level using JPA Pessimistic Write Locking (`PESSIMISTIC_WRITE`). When two users request the same slot at the exact same millisecond, the first transaction acquires an exclusive row lock (`SELECT ... FOR UPDATE`), transitions `isBooked = true`, while the second transaction fails cleanly with `SlotAlreadyBookedException`:

```java
@Repository
public interface DoctorSlotRepository extends JpaRepository<DoctorSlot, UUID> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM DoctorSlot s WHERE s.id = :slotId AND s.isBooked = false")
    Optional<DoctorSlot> findSlotForBookingWithLock(@Param("slotId") UUID slotId);
}
```

```java
@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final DoctorSlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    @Transactional
    public AppointmentResponse bookAppointment(AppointmentBookingRequest request, UUID patientId) {
        // Obtains exclusive database row lock; waits or throws if another transaction touches it
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
}
```

---

## 5. Spring Security 6 RBAC

Stateless Role-Based Access Control (RBAC) with Spring Security 6:

```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/swagger-ui/**", "/v3/api-docs/**", "/h2-console/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/doctor/**").hasRole("DOCTOR")
                .requestMatchers("/api/v1/patient/**").hasRole("PATIENT")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

---

## 6. Project Structure

```text
HospitalManagementSystem
├── client/                                    # Frontend Web Application (React 18 + Vite)
│   ├── public/
│   │   └── careplus_logo.png                  # Official CarePlus logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                     # Branding, emergency bar, role switcher
│   │   │   ├── CommandDashboard.jsx           # Facility telemetry & capacity grid
│   │   │   ├── ReferralBridge.jsx             # 7-Stage referral tracking pipeline
│   │   │   ├── QueueTV.jsx                    # Waiting room display with audio chime
│   │   │   ├── DiagnosticsCenter.jsx          # Lab test orders & digital reports
│   │   │   ├── DoctorWorkstation.jsx          # SOAP notes & e-prescriptions
│   │   │   ├── PatientPortal.jsx              # ABHA health ID, vitals, booking
│   │   │   ├── AdminCompliance.jsx            # Concurrency sandbox & HIPAA logs
│   │   │   ├── BookAppointmentModal.jsx       # Slot reservation wizard
│   │   │   └── SOSModal.jsx                   # Emergency 108 ambulance dispatch
│   │   ├── data/
│   │   │   └── mockData.js                    # Clinical data models
│   │   ├── App.jsx                            # Root application component
│   │   ├── index.css                          # Clinical design system & tokens
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                                    # Backend Enterprise Service (Spring Boot 3)
│   ├── pom.xml                                # Maven build definition
│   └── src/main/
│       ├── java/com/healthcare/ohms/
│       │   ├── OhmsApplication.java           # Entry point & seed data runner
│       │   ├── config/                        # Security, JWT, and OpenAPI configs
│       │   ├── controller/                    # REST API Controllers
│       │   ├── dto/                           # Request & Response DTOs
│       │   ├── entity/                        # JPA Entities (User, Appointment, Slot...)
│       │   ├── enums/                         # Role, AppointmentStatus
│       │   ├── exception/                     # Global exception handlers
│       │   ├── repository/                    # Spring Data JPA Repositories
│       │   └── service/                       # Business logic & implementations
│       └── resources/
│           ├── application.properties         # Development profile (H2 PostgreSQL mode)
│           └── application-prod.properties    # Production profile (PostgreSQL 15+)
│
├── docs/                                      # Documentation & Architecture Assets
│   └── images/
│       └── logo.png
├── .gitignore
└── README.md
```

---

## 7. Getting Started

### Prerequisites
- **Java Development Kit (JDK):** Version 17 or 21+
- **Apache Maven:** 3.8+
- **Node.js:** v18.0+ & **npm:** v9.0+

---

### Step 1: Start the Backend (Spring Boot 3)

```bash
cd server
mvn spring-boot:run
```

- Server starts at: `http://localhost:8080`
- Swagger UI Documentation: `http://localhost:8080/swagger-ui.html`
- OpenAPI Specification: `http://localhost:8080/v3/api-docs`
- H2 Database Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:careplusdb`)

#### Default Seed Credentials:
| Role | Username | Password | Access Scope |
| --- | --- | --- | --- |
| **Administrator** | `admin` | `admin123` | Full administrative & audit governance |
| **Doctor** | `dr.kulkarni` | `doctor123` | Physician workstation & consultation |
| **Patient** | `rahul.patil` | `patient123` | Self-service portal & health records |

---

### Step 2: Start the Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

- Client starts at: `http://localhost:5173`
- Open your browser to explore all dashboards, the live Queue TV audio chime, the 7-stage referral progression, and the concurrency sandbox!

---

## 8. REST API & Swagger UI

Interactive documentation is automatically generated by SpringDoc OpenAPI at `http://localhost:8080/swagger-ui.html`.

### Key Endpoints:
- `POST /api/v1/auth/login` — Stateless JWT generation
- `POST /api/v1/appointments/book` — Pessimistic lock appointment reservation
- `GET /api/v1/appointments/slots/{doctorId}` — List unbooked doctor slots
- `GET /api/v1/doctor/appointments/{doctorId}` — Doctor patient consultation roster
- `POST /api/v1/doctor/records` — Create SOAP notes & digital prescription
- `GET /api/v1/patient/records/{patientId}` — Historical EMR record retrieval
- `GET /api/v1/admin/metrics` — Healthcare facility telemetry

---

## 9. Compliance & Security Baseline

- **HIPAA / GDPR Alignment:** Strict separation of patient identifying information, role boundary enforcement, and cryptographically timestamped access audit trails.
- **ABHA / FHIR R4 Ready:** Data structures modeled after Fast Healthcare Interoperability Resources (FHIR) for interoperable diagnostic exchange.
- **Zero AI-Generated Emoji Borders:** Designed for clinical trust, reliability, and enterprise compliance.

---

<div align="center">
  <sub>Built with ❤️ for Healthcare Professionals and Patients. CarePlus Healthcare Systems.</sub>
</div>
